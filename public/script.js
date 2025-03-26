let apiKey = "";
const searchButton = document.getElementById("search-btn");
const searchBox = document.getElementById("city-input");
const weatherIcon = document.getElementById("weather-icon");
const forecastContainer = document.getElementById("forecast-container");

// Fetch API key from server
fetch("/api/key")
    .then(response => response.json())
    .then(data => {
        apiKey = data.apiKey;
        console.log("API Key Loaded:", apiKey);
    })
    .catch(error => console.error("Error loading API key:", error));

// Event listener for search button click
searchButton.addEventListener("click", function () {
    if (!apiKey) {
        showAlert("API Key not loaded! Try again.");
        return;
    }
    
    const city = searchBox.value.trim();
    if (city) {
        getWeather(city);
        getForecast(city);
    } else {
        showAlert("Please enter a city name!");
    }
});

// Allow pressing "Enter" to trigger search
searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

// Function to fetch current weather
function getWeather(city) {
    const cacheKey = `weather_${city}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);

    // Check if we have valid cached data (less than 10 mins old)
    if (cachedData && cacheTime && (Date.now() - cacheTime < 10 * 60 * 1000)) {
        console.log("Using cached weather data for:", city);
        updateWeatherUI(JSON.parse(cachedData));
        return;
    }

    // Fetch new data if no valid cache
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch weather data.");
            return response.json();
        })
        .then(data => {
            if (!data.location || !data.current) throw new Error("Incomplete weather data received.");
            
            // Save new data to cache
            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(`${cacheKey}_time`, Date.now());

            updateWeatherUI(data);
        })
        .catch(error => showAlert(error.message));
}

// Function to update weather UI
function updateWeatherUI(data) {
    document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temperature").innerText = `${Math.round(data.current.temp_c)}°C`;
    document.getElementById("description").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;
    weatherIcon.src = `https:${data.current.condition.icon}`;
}

// Function to Fetch 7-Day Forecast
function getForecast(city) {
    const cacheKey = `forecast_${city}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);

    if (cachedData && cacheTime && (Date.now() - Number(cacheTime) < 10 * 60 * 1000)) {
        console.log("Using cached forecast data for:", city);
        updateForecastUI(JSON.parse(cachedData));
        return;
    }

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch forecast data.");
            return response.json();
        })
        .then(data => {
            if (!data.forecast || !data.forecast.forecastday) throw new Error("Incomplete forecast data received.");

            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(`${cacheKey}_time`, Date.now());

            updateForecastUI(data);
        })
        .catch(error => showAlert(error.message));
}

// Function to update forecast UI
function updateForecastUI(data) {
    forecastContainer.innerHTML = "";

    data.forecast.forecastday.forEach(day => {
        const forecastCard = document.createElement("div");
        forecastCard.className = "forecast-card";

        forecastCard.innerHTML = `
            <p class="forecast-date">${formatDate(day.date)}</p>
            <img class="forecast-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p class="forecast-temp">${Math.round(day.day.avgtemp_c)}°C</p>
            <p class="forecast-condition">${day.day.condition.text}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

// Function to Format Date for Better Display
function formatDate(dateString) {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to show alerts to the user
function showAlert(message) {
    const alertBox = document.getElementById("alert-box");
    alertBox.innerText = message;
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}