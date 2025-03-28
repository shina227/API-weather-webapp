# Weather App

## Overview
This is a **simple weather web application** that allows users to check the current weather and a 7-day forecast for any city using the WeatherAPI.com service. The application provides weather details such as temperature, conditions, humidity, and wind speed. It features a modern UI with weather icons and animations for a great user experience.

## Features
- Search for weather data by city name.
- Displays current temperature, conditions, humidity, wind speed, and more.
- 7-day forecast with daily temperature.
- User-friendly interface.
- Proper error handling for invalid locations and API failures.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **External API:** [WeatherAPI.com](https://www.weatherapi.com/)
- **Deployment:** Hosted on two web servers with a load balancer

## Installation & Setup
### Prerequisites
- A modern web browser
- Node.js installed (for running a local development server, if needed)
- An API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/shina227/API-weather-webapp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd API-weather-webapp
   ```
3. Open `index.html` in your browser or use a local server (e.g., Live Server extension in VS Code).
4. Set up your API key in `script.js`:
   ```javascript
   const apiKey = "YOUR_WEATHER_API_KEY";
   ```
5. Search for a city in the input field to fetch weather data.

## API Usage & Attribution
### Weather API Details
- **API Provider:** [WeatherAPI.com](https://www.weatherapi.com/)
- **Endpoints Used:**
  - `/current.json`: Fetches real-time weather conditions.
  - `/forecast.json`: Fetches 7-day weather forecasts.
- **Example API Request:**
  ```bash
  https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=London&days=7
  ```
- **Attribution:** This project utilizes data from WeatherAPI.com in compliance with their terms of service.

## Deployment Steps
1. Set up two web servers and deploy the application files.
2. Configure a load balancer to distribute traffic evenly between servers.
4. Verify that the site runs smoothly on the deployed domain.

## Demo Video
[Link to Demo Video](https://vimeo.com/1070490411/449acc146a?ts=0&share=copy)

## Author
Created by **Atete Mpeta Shina.**

## License
This project is open-source under the MIT License.

