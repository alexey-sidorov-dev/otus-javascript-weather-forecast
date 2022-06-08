import { isArray, isObject } from "lodash";
import { getGeoData } from "./getGeoData";
import { getWeatherData } from "./getWeatherData";

export async function displayWeather(element, data) {
  element.innerHTML = `<span>Погода в городе</span>`;
  return;
  /* eslint-disable */
  const geoData = await getGeoData(data);
  const weatherData = await getWeatherData({
    longitude: geoData.longitude,
    latitude: geoData.latitude,
    type: "geo",
  });
  const weather =
    weatherData.weather && isArray(weatherData.weather)
      ? weatherData.weather[0]
      : [];
  const main =
    weatherData.main && isObject(weatherData.main) ? weatherData.main : {};
  const sys =
    weatherData.sys && isObject(weatherData.sys) ? weatherData.sys : {};
  element.classList.add("weather-page");
  const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  element.innerHTML = `
  <header class="app-header">Header</header>
        <h1>Прогноз погоды</h1>
        <p class="weather">
          ${sys.country ?? "Error"}, ${weatherData.name ?? "Error"} ${
    Math.floor(main.temp) ?? "Error"
  }&deg;C ${weather.description ?? "Error"}
        </p>
        <img class="weather-icon" src=${iconUrl} alt=":(">
        <footer class="app-footer">Copyright&copy;</footer>
    `;
}
