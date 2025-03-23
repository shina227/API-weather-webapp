const apiKey = "bd6f4c8f0148433aae0113023252303";
const searchButton = document.getElementById("search-btn");
const searchBox = document.getElementById("city-input");
const weatherIcon = document.getElementById("weather-icon");
const forecastContainer = document.getElementById("forecast-container");

// When the user clicks the search button, fetch weather data for the entered city
searchButton.addEventListener("click", function () {
    const city = searchBox.value.trim();
    if (city) {
        getWeather(city);
        getForecast(city);
    } else {
        showAlert("Please enter a city name!");
    }
});

// Allow Enter Key to search
searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

// Function to fetch current weather
function getWeather(city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) throw new Error("Invalid location! Please check the city name.");
                if (response.status === 403) throw new Error("API limit exceeded. Try again later.");
                throw new Error("Failed to fetch weather data.");
            }
            return response.json();
        })
        .then(data => {
            if (!data.location || !data.current) throw new Error("Incomplete weather data received.");

            document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
            document.getElementById("temperature").innerText = `${Math.round(data.current.temp_c)}°C`;
            document.getElementById("description").innerText = data.current.condition.text;
            document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;
            weatherIcon.src = `https:${data.current.condition.icon}`;
        })
        .catch(error => showAlert(error.message));
}

// Function to Fetch 7-Day Forecast
function getForecast(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) throw new Error("Invalid location for forecast.");
                if (response.status === 403) throw new Error("API limit exceeded. Try again later.");
                throw new Error("Failed to fetch forecast data.");
            }
            return response.json();
        })
        .then(data => {
            if (!data.forecast || !data.forecast.forecastday) throw new Error("Incomplete forecast data received.");

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
        })
        .catch(error => showAlert(error.message));
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