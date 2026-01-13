const refreshBtn = document.getElementById('refreshBtn');

async function fetchWeatherData() {
    try {
        const response = await fetch("/api/weather");
        if (!response.ok) throw new Error("Data load error");

        const data = await response.json();

        if (data.length > 0) {
            updateStats(data[0], data.length);
        }

        renderTable(data);

    } catch (error) {
        console.error("Error:", error);
    }
}

function updateStats(latest, count) {
    document.getElementById('cityName').textContent = latest.city;
    document.getElementById('minTemp').textContent = `${latest.min_temp}°C`;
    document.getElementById('maxTemp').textContent = `${latest.max_temp}°C`;
    document.getElementById('totalRecords').textContent = count;
}

function renderTable(data) {
    const tableBody = document.getElementById('weatherData');
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.city}</td>
            <td class="text-blue">${item.min_temp}°C</td>
            <td class="text-red">${item.max_temp}°C</td>
            <td>${item.description || item.condition}</td>
        `;
        tableBody.appendChild(row);
    });
}

refreshBtn.addEventListener('click', async () => {
    refreshBtn.disabled = true;
    refreshBtn.classList.add('loading'); 
    
    await fetchWeatherData();
    
    refreshBtn.disabled = false;
    refreshBtn.classList.remove('loading');
});

fetchWeatherData();