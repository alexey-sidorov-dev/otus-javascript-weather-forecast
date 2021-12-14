import { isArray, isObject } from "lodash";
import { getWeatherData } from "./getWeatherData";
import { getGeoData } from "./getGeoData";

export async function showWeatherPage(element) {
  const geoData = await getGeoData();
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
        <h1>Прогноз погоды</h1>
        <p class="weather">
          ${sys.country ?? "Error"}, ${weatherData.name ?? "Error"} ${
    main.temp ?? "Error"
  } ${weather.description ?? "Error"}
        </p>
        <img class="weather-icon" src=${iconUrl} alt=" ">
    `;
}
