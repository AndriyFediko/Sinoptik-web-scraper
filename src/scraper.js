const {chromium} = require('playwright-extra');
const { saveWeatherData } = require('./database');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function sinopticScraper(city) {
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'uk-UA',
        viewport: { width: 1280, height: 720 },
    });

    const page = await context.newPage();

    try {
        await page.goto(`https://sinoptik.ua/pohoda/${city}`, {waitUntil: 'domcontentloaded'});
        await page.waitForSelector(".DMP0kolW");

        await page.click('text="10 днів"');

        let allDaysData = [];
        const dayTabs = await page.$$('.DMP0kolW .tkK415TH');

        for(let i = 0; i<dayTabs.length; i++){
            const ramdomDelay = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
            await dayTabs[i].click();
            await page.waitForTimeout(ramdomDelay);

            const data = await page.evaluate((cityName) =>{
                const activeTab = document.querySelector('.tkK415TH.OGO-yOID');
                if (!activeTab) return null;
                const tempBlocks = activeTab.querySelectorAll('.oOVtmpFl > div');
                return {
                    city: cityName,
                    date: `${document.querySelector(`.OGO-yOID .xM6dxfW4`)?.innerText} ${document.querySelector(`.OGO-yOID .RSWdP9mW`)?.innerText} ${document.querySelector(`.OGO-yOID .yQxWb1P4`)?.innerText}`,
                    min_temp: (tempBlocks[0]?.querySelector('p:last-child')?.innerText).replaceAll("°", ""),
                    max_temp: (tempBlocks[1]?.querySelector('p:last-child')?.innerText).replaceAll("°", ""),
                    description: document.querySelector('.GVzzzKDV')?.innerText,
                }
            }, city);

            if(data){
                allDaysData.push(data);
            }
        }

        if(allDaysData.length > 0){
            await saveWeatherData(allDaysData);
        }


    } catch (error) {
        console.log(error);
    } finally{
        await browser.close();
    }
}

sinopticScraper('lviv');