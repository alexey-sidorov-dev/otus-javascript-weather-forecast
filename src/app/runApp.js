import { displaySearch } from "./displaySearch";
import { displayWeather } from "./displayWeather";
import { displayMap } from "./displayMap";
import { displayHistory } from "./displayHistory";
import { getGeoData } from "./getGeoData";
import { addInputListener } from "./addInputListener";
import { getWeatherData } from "./getWeatherData";

export async function runApp(app) {
  app.innerHTML = `
    <div class=main-wrapper>
      <div id="search" class="search">search</div>
      <div id="weather" class="weather">Запрашиваем погоду в вашем городе</div>
      <div id="map" class="map" hidden></div>
      <div id="history" class="history"></div>
    </div>
  `;
  const input = document.querySelector("#search");
  displaySearch(input);
  addInputListener(input);

  const history = document.querySelector("#history");
  displayHistory(history);

  // TODO:
  const geoData = await getGeoData();
  const weatherData = await getWeatherData(geoData);

  const weather = document.querySelector("#weather");
  displayWeather(weather, weatherData);

  const map = document.querySelector("#map");
  displayMap(map, weatherData);
}
