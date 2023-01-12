function formatDate(nowDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[nowDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[nowDate.getMonth()];
  let date = nowDate.getDate();
  let year = nowDate.getFullYear();
  let hours = nowDate.getHours();
  let minutes = nowDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampm = hours >= 12 ? "pm" : "am";
  return `${day} ${month} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
}
let nowDate = new Date();
let currentDateTime = document.querySelector("#current-date-time");

currentDateTime.innerHTML = formatDate(nowDate);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    let apiKey = "65d25f36438b27648db0a8a40eb3f502";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    h1.innerHTML = null;
    alert("Please enter city name");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

 <div class="col-2" id="forecast">
  <u>${formatDay(forecastDay.dt)}</u>
</br>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" />
</br>
   ${Math.round(forecastDay.temp.max)}º
</br>
${Math.round(forecastDay.temp.min)}º
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature} ºC`;
  document.querySelector("h1").innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function celsiusConvert(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `19`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConvert);

function fahrenheitConvert(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `66`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConvert);

function searchLocation(position) {
  let apiKey = "65d25f36438b27648db0a8a40eb3f502";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);
