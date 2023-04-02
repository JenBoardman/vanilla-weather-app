function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let dateNumber = date.getDate();
  return `${day}, ${month} ${dateNumber}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTempreature(response) {
  celsiusTempreture = response.data.temperature.current;
  let tempretureElement = document.querySelector("#currenttemp");
  tempretureElement.innerHTML = Math.round(celsiusTempreture);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatTime(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
}
function search(city) {
  let apiKey = "0622tcaa31a9d02f3oa3ff0e63b0bb64";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTempreture * 9) / 5 + 32;
  let tempretureElement = document.querySelector("#currenttemp");
  tempretureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempretureElement = document.querySelector("#currenttemp");
  tempretureElement.innerHTML = Math.round(celsiusTempreture);
}

//geolocate

function findloacation(position) {
  let apiKey = "0622tcaa31a9d02f3oa3ff0e63b0bb64";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreature);
}
function geoLocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let celsiusTempreture = null;

let findLocation = document.querySelector("#location-button");
findLocation.addEventListener("click", geoLocate);
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("London");
