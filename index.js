function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  document.querySelector("#city-header").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = `${temperature}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let searchText = document.querySelector("#city");
  if (searchText.value) {
    document.querySelector("#city-header").innerHTML = `${searchText.value}`;
    let city = `${searchText.value}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
  } else {
    alert("Please type a city...");
  }
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("button");
button.addEventListener("click", showCurrentLocation);

let apiKey = "2a93853098f7d48795c997915462e083";
let units = "metric";
