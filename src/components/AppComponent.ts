import { Component } from "./Component";
import { SearchComponent } from "./SearchComponent";
import { InfoComponent } from "./InfoComponent";
import { WeatherComponent } from "./WeatherComponent";
import { MapComponent } from "./MapComponent";
import { HistoryComponent } from "./HistoryComponent";
import { Geo } from "../api/Geo";
import { Config } from "../config/Config";
import { Weather } from "../api/Weather";
import { GeoData } from "../types/api";
import { normalizeTarget, normalizeWeather } from "../helpers/utils";
import { AppState } from "../types/component";

export class AppComponent extends Component {
  private config: Config;

  constructor(element: HTMLElement, initialState?: Partial<AppState>) {
    super(element);

    this.config = new Config();
    this.setState({ ...this.state, ...initialState });
  }

  protected render(): string {
    return this.templater.template(
      [
        '<div class="widget" id="widget">',
        '<span class="widget__title">Прогноз погоды</span>',
        '<div class="top" id="top">',
        '<div class="search" id="search"></div>',
        '<div class="info" id="info"></div>',
        '<div class="weather" id="weather"></div>',
        "</div>",
        '<div class="bottom" id="bottom">',
        '<div class="map" id="map"></div>',
        '<div class="history" id="history"></div>',
        "</div>",
        "</div>",
      ].join("")
    );
  }

  protected async onMount(): Promise<void> {
    super.onMount();

    const searchComponent = new SearchComponent(
      <HTMLElement>document.getElementById("search")
    );
    const infoComponent = new InfoComponent(
      <HTMLElement>document.getElementById("info"),
      {
        infoType: "info",
        infoText: "Запрашиваем погоду в вашем городе...",
      }
    );

    this.on("info:display", infoComponent.updateState);

    try {
      const userGeo = await new Geo(this.config).getGeo();
      const userWeather = await new Weather(this.config).getWeather(
        <GeoData>userGeo
      );
      const normalizedTarget = normalizeTarget(userWeather);
      const normalizedWeather = normalizeWeather(userWeather);
      this.emit("info:display", {
        infoType: "info",
        infoText: `Погода в городе ${normalizedTarget?.city}, ${normalizedTarget?.country}`,
      });

      const weatherComponent = new WeatherComponent(
        <HTMLElement>document.getElementById("weather"),
        normalizedWeather
      );
      const mapComponent = new MapComponent(
        <HTMLElement>document.getElementById("map"),
        normalizedTarget
      );
      const historyComponent = new HistoryComponent(
        <HTMLElement>document.getElementById("history")
      );

      searchComponent.on("info:display", infoComponent.updateState);
      searchComponent.on("weather:display", weatherComponent.updateState);
      searchComponent.on("map:display", mapComponent.updateState);
      searchComponent.on("history:display", historyComponent.updateState);

      historyComponent.on("info:display", infoComponent.updateState);
      historyComponent.on("weather:display", weatherComponent.updateState);
      historyComponent.on("map:display", mapComponent.updateState);
      historyComponent.on("history:display", historyComponent.updateState);
    } catch (error) {
      this.emit("info:display", {
        infoType: "error",
        infoText: "При запросе погоды произошла ошибка",
      });
    }
  }
}
