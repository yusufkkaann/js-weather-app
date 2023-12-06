const apiKey = "11ad6ff7c9841b0807df6c0bdc0d915c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function getWeatherData(cityName) {
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").classList.remove("active");
  } else {
    document.querySelector(".error").style.display = "none";
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "img/clouds.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "img/rain.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "img/snow.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "img/Clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "img/mist.png";
  }

  document.querySelector(".weather").classList.add("active");
}
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (searchInput.value == "") {
    alert("Please Enter a City Name");
  } else {
    getWeatherData(searchInput.value);
  }
  searchInput.value = "";
});
