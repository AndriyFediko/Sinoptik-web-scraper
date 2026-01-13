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

## 🚀 Planned Features & Future Improvements

To make this project even more robust and scalable, I plan to implement the following features:

* **Multi-city Support:** Refactor the core logic to accept an array of cities and scrape weather data for multiple locations in a single run.
* **Automated Scheduling (CI/CD):** Integrate **GitHub Actions** to automate the scraping process, allowing the database to update daily at a specific time without manual intervention.
* **Telegram Bot Integration:** Add a notification layer using the Telegram Bot API to send daily weather summaries or alerts directly to a mobile device.
