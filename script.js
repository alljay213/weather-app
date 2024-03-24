// Assuming these elements exist in your HTML
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherInfo = document.getElementById("weatherInfo");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const feelsLikeElement = document.getElementById("feels-like");
const mainElement = document.getElementById("main");
const descriptionElement = document.getElementById("description");
const maxElement = document.getElementById("temp-max");
const minElement = document.getElementById("temp-min");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const pressureElement = document.getElementById("pressure");
const visibilityElement = document.getElementById("visibility");
const weatherIconElement = document.getElementById("icon");

// Fetch weather data based on coordinates
async function getWeatherByCoords(lat, lon) {
  try {
    const apiKey = "339222ebb65b1273e29c3998ea742b41";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Fetch weather data for a given city name
async function getWeather(city) {
  try {
    const apiKey = "339222ebb65b1273e29c3998ea742b41";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Display weather data on the UI
function displayWeatherData(data) {
  const cityName = data.name;
  const country = data.sys.country;
  const temperature = Math.round(data.main.temp);
  const main = data.weather[0].main;
  const description = data.weather[0].description;
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed);
  const pressure = data.main.pressure;
  const visibility = data.visibility;
  const tempMax = Math.round(data.main.temp_max);
  const tempMin = Math.round(data.main.temp_min);
  const weatherIcon = data.weather[0].icon;

  // Display the weather data
  locationElement.textContent = `${cityName}, ${country}`;
  weatherIconElement.innerHTML = `<img id="weather-icon" class="grow-on-load hover-animation" src="https://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="weather icon" />`;

  temperatureElement.textContent = `${temperature}°C`;
  mainElement.innerHTML = `<strong>Main: <br /></strong>${main}`;
  descriptionElement.innerHTML = `<strong>Description: <br /></strong>${description}`;
  feelsLikeElement.innerHTML = `<strong>Feels like: </strong>${feelsLike}°C`;
  humidityElement.innerHTML = `<strong>Humidity: </strong>${humidity}%`;
  maxElement.innerHTML = `<strong>Max: </strong>${tempMax}°C`;
  minElement.innerHTML = `<strong>Min: </strong>${tempMin}°C`;
  windSpeedElement.innerHTML = `<strong>Wind: </strong> ${windSpeed} km/h`;
  pressureElement.innerHTML = `<strong>Pressure: </strong>${pressure} hPa`;
  visibilityElement.innerHTML = `<strong>Visibility: </strong>${visibility} km`;
}

// Fetch weather data based on the user's location
async function fetchWeatherDataByLocation() {
  try {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          await getWeatherByCoords(lat, lon);
        },
        async () => {
          // If the user denies permission or if an error occurs, use a default location
          await getWeather("New York"); // You can change this to any default location you prefer
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Call fetchWeatherDataByLocation to get weather data based on the user's location by default
fetchWeatherDataByLocation();

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  const cityName = cityInput.value;
  getWeather(cityName);
  cityInput.value = "";
});

// Create a function to update the current time
function updateCurrentTime() {
  // Create a new Date object
  const now = new Date();

  // Get the current time components
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const today = now.toISOString().slice(0, 10);
  const dayOfWeekNumber = now.getDay();

  // Convert the number to the name of the day
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours) as 12 AM

  // Format hours and minutes as two-digit strings
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Format the seconds as a two-digit string
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Format the time as a string
  const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  // Update the content of the div with id "current-time"
  document.getElementById(
    "current-time"
  ).innerHTML = `<b>${today}</b> | <b>${dayOfWeekName}</b> | <b>${timeString}</b>`;
}

// Call the updateCurrentTime function initially to display the current time
updateCurrentTime();

// Update the current time every second (1000 milliseconds)
setInterval(updateCurrentTime, 1000);

function setDayNightMode() {
  const searchBtn = document.getElementById("searchButton");
  const container = document.getElementById("container");
  const currentTime = document.getElementById("current-time");
  const now = new Date();
  const hour = now.getHours();
  const body = document.body;

  // Check if it's nighttime (between 7pm and 6:59am)
  const isNight = hour >= 19 || hour < 7;

  // Update CSS variables based on day/night mode
  if (isNight) {
    body.style.setProperty(
      "background",
      "linear-gradient(135deg, #0d324d, #7f5a83)"
    );
    container.style.setProperty("background-color", "#28282B");
    container.style.setProperty("box-shadow", "0 0 5px #f5f0f0 ");
    body.style.setProperty("color", "#f5f0f0 ");
    currentTime.style.setProperty("color", "#f5f0f0 ");
  } else {
    body.style.setProperty(
      "background",
      "linear-gradient(135deg, #007FFF, #f5f0f0 )"
    );
    searchBtn.style.setProperty("background-color", "#F28500");
    container.style.setProperty("background-color", "#B0E0E6");
    container.style.setProperty("box-shadow", "0 0 5px #28282B");
    body.style.setProperty("color", "#28282B");
    currentTime.style.setProperty("color", "#28282B");
  }
}

// Call the setDayNightMode function initially to set the color palette
setDayNightMode();

// Update the day/night mode every minute
setInterval(setDayNightMode, 60000);

// Function to reload the page at 7 AM and 7 PM
function reloadPageAtScheduledTimes() {
  const now = new Date();
  const currentHour = now.getHours();

  // Calculate the time until the next 7 AM or 7 PM
  let hoursUntilReload;
  if (currentHour < 7) {
    hoursUntilReload = 7 - currentHour;
  } else if (currentHour < 19) {
    hoursUntilReload = 19 - currentHour;
  } else {
    hoursUntilReload = 31 - currentHour; // Reload at 7 AM next day
  }

  // Convert hours to milliseconds
  const millisecondsUntilReload = hoursUntilReload * 60 * 60 * 1000;

  // Schedule the page reload
  setTimeout(() => {
    location.reload();
  }, millisecondsUntilReload);
}

// Call reloadPageAtScheduledTimes to schedule the reload
reloadPageAtScheduledTimes();
