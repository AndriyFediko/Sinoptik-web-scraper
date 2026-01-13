# 🌦️ Sinoptik Weather Scraper & Dashboard

A Node.js-based ETL (Extract, Transform, Load) system that autonomously scrapes, stores, and visualizes weather data using cloud-based automation.

## 🚀 Key Features
* **Automated Daily Scraping**: Configured with GitHub Actions to execute the scraper daily via a Cron schedule (08:00 Kyiv time), ensuring the database stays current without manual intervention.
* **Anti-Bot Detection**: Utilizes Playwright with the Stealth plugin to mimic human behavior and bypass bot protection systems.
* **Cloud Data Storage**: Fully integrated with Supabase (PostgreSQL) for structured storage and historical data persistence.
* **Responsive Web Dashboard**: A modern frontend built with Express.js, featuring a robust table layout designed to handle long weather descriptions across all devices.
* **Secure Credential Management**: Sensitive data like API keys and database URLs are managed securely via GitHub Secrets and Dotenv.

## 🛠 Tech Stack
* **Node.js & Playwright** (with stealth plugin) for scraping.
* **Supabase** (PostgreSQL) for cloud data storage.
* **GitHub Actions** for CI/CD and task scheduling.
* **Express.js** for the dashboard backend.
* **Modern CSS** (Grid & Flexbox) for a responsive, stable UI.

## 📋 How It Works
* **Automation**: GitHub Actions triggers the script every morning based on a Cron expression.
* **Scraping**: Launches a headless browser to visit Sinoptik.ua and iterates through 10-day forecast tabs.
* **Data Processing**: Cleans raw strings (removes "°" symbols), formats dates, and structures data into JSON.
* **Database Upsert**: Performs an upsert operation to Supabase, updating existing records or adding new ones to prevent duplicates.
* **Visualization**: The dashboard fetches the latest data and renders it in a specialized table.
