const apiKey = 0d9efce46a7379e5a47f61014ebf6cf5;

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("search");
const weatherDiv = document.getElementById("weather");
const historyList = document.getElementById("history");

// Search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

// Press Enter to search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// Fetch weather
async function getWeather(city) {
    weatherDiv.innerHTML = "<p>Loading...</p>";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // Check Console (F12)

        if (response.ok) {
            weatherDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                <h3>${data.main.temp} °C</h3>
                <p><strong>${data.weather[0].main}</strong></p>
                <p>${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
            `;

            saveHistory(data.name);
        } else {
            weatherDiv.innerHTML = `<h3>${data.message}</h3>`;
        }
    } catch (error) {
        console.error(error);
        weatherDiv.innerHTML = "<h3>Something went wrong. Please try again.</h3>";
    }
}

// Save search history
function saveHistory(city) {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    // Remove duplicate
    cities = cities.filter(c => c.toLowerCase() !== city.toLowerCase());

    // Add latest search at the top
    cities.unshift(city);

    // Keep only last 5 searches
    cities = cities.slice(0, 5);

    localStorage.setItem("cities", JSON.stringify(cities));

    showHistory();
}

// Display search history
function showHistory() {
    historyList.innerHTML = "";

    const cities = JSON.parse(localStorage.getItem("cities")) || [];

    cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });

        historyList.appendChild(li);
    });
}

// Load history on page load
showHistory();
