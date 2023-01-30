import { Config } from "./Config";
import { Geo } from "./Geo";
import { Weather } from "./Weather";
import { Map } from "./Map";
import { History } from "./History";
import { Widget } from "./Widget";

export class App {
  constructor() {
    this.config = new Config();
    this.map = new Map(this.config);
    this.geo = new Geo(this.config);
    this.weather = new Weather(this.config);
    this.history = new History(this.config);
    this.widget = new Widget({
      config: this.config,
      map: this.map,
      geo: this.geo,
      weather: this.weather,
      history: this.history,
    });
  }

  async run(root) {
    this.root = root;
    try {
      this.createInitLayout();
      this.widget.displayInitApp();

      const userGeoData = await this.geo.getGeo();
      const userWeatherData = await this.weather.getWeather(userGeoData);
      await this.widget.displayWeather(userWeatherData);
      await this.widget.displayMap(
        this.widget.getNormalizedTarget(userWeatherData)
      );
    } catch (e) {
      this.widget.displaySearchError("При запросе погоды произошла ошибка");
    }
  }

  createInitLayout() {
    this.root.innerHTML = [
      '<div class="widget" id="widget">',
      '<span class="widget__title">Прогноз погоды</span>',
      '<div class="top" id="top">',
      '<div class="search" id="search"></div>',
      '<div class="weather" id="weather"></div>',
      "</div>",
      '<div class="bottom" id="bottom">',
      '<div class="map" id="map"></div>',
      '<div class="history" id="history"></div>',
      "</div>",
      "</div>",
    ].join("");
  }
}
