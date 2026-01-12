const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function saveWeatherData(data) {
    const {weatherData, error} = await supabase
        .from('weather_data')
        .upsert(data, {onConflict: 'city, date'});

    if(error){
        throw new Error('Supabase error', error.message);
    }
    return weatherData;
}

module.exports = {saveWeatherData}