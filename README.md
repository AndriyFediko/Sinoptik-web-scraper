# Sinoptik Weather Scraper

A Node.js tool that scrapes 10-day weather forecasts from Sinoptik.ua and stores them in a Supabase PostgreSQL database.

## Tech Stack
- **Node.js** & **Playwright** (with stealth plugin) for scraping.
- **Supabase** (PostgreSQL) for data storage.
- **Dotenv** for secure environment variable management.

## How it works
1. Launches a headless browser to visit Sinoptik.ua.
2. Navigates through 10-day tabs to collect min/max temperatures and descriptions.
3. Cleans data (removes symbols) and performs an `upsert` to the database.
