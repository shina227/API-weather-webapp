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
            if (!response.ok) throw new Error("Invalid location!");
            return response.json();
        })
        .then(data => {
            document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
            document.getElementById("temperature").innerText = `${Math.round(data.current.temp_c)}°C`;
            document.getElementById("description").innerText = data.current.condition.text;
            document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;
            weatherIcon.src = `https:${data.current.condition.icon}`;
        })
        .catch(error => alert(error.message));
}

// Function to Fetch 7-Day Forecast
function getForecast(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
        .then(response => response.json())
        .then(data => {
            forecastContainer.innerHTML = "";
            data.forecast.forecastday.forEach(day => {
                const forecastCard = document.createElement("div");
                forecastCard.className = "forecast-card";
                forecastCard.innerHTML = `
                    <p>${new Date(day.date).toDateString()}</p>
                    <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                    <p>${Math.round(day.day.avgtemp_c)}°C - ${day.day.condition.text}</p>
                `;
                forecastContainer.appendChild(forecastCard);
            });
        })
        .catch(error => console.log("Fetch error: " + error.message));
}

forecastContainer.innerHTML += `
    <div class="forecast-item">
        <p>${date}</p>
        <img class="forecast-icon" src="${icon}" alt="${condition}">
        <p class="forecast-temp">${temp}°C - ${condition}</p>
    </div>
`;

// Function to show alerts to the user
function showAlert(message) {
    alert(message);
}