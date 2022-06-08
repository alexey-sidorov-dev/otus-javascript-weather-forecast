import { displayInput } from "./displayInput";
import { displayWeather } from "./displayWeather";
import { displayMap } from "./displayMap";
import { displayHistory } from "./displayHistory";
import { getGeoData } from "./getGeoData";
import { addInputListener } from "./addInputListener";
import { getWeatherData } from "./getWeatherData";

export async function runApp(app) {
  app.innerHTML = `
    <div class=container>
      <div class="input">input</div>
      <div class="weather">dispaly</div>
      <div class="map">map</div>
      <div class="history">history</div>
    <div>
  `;
  const input = document.querySelector(".input");
  displayInput(input);
  addInputListener(input);

  const history = document.querySelector(".history");
  displayHistory(history);

  // TODO:
  const geoData = await getGeoData();
  const weatherData = await getWeatherData(geoData);

  const weather = document.querySelector(".weather");
  displayWeather(weather, weatherData);

  const map = document.querySelector(".map");
  displayMap(map, weatherData);
}
