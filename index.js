require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 7000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/weather', async (req, res) => {
    try {
        const TARGET_CITY = 'lviv'; 

        const { data, error } = await supabase
            .from('weather_data')
            .select('*')
            .ilike('city', TARGET_CITY)
            .order('date', { ascending: true });

        if (error) {
            console.error('Supabase error:', error.message);
            throw error;
        }

        res.status(200).json(data || []);

    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from database' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});