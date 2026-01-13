const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('supabaseUrl or supabaseKey not found');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function saveWeatherData(data) {
    const { data: weatherData, error } = await supabase
        .from('weather_data')
        .upsert(data, { onConflict: 'city, date' })
        .select(); 

    if (error) {
        console.error('Supabase error detail:', error);
        throw new Error(`Supabase error: ${error.message}`);
    }

    console.log('Data saved successfully to the database');

    return weatherData; 
}

module.exports = {saveWeatherData}