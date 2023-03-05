import { Component } from "./Component";
import { SearchComponent } from "./SearchComponent";
import { WeatherComponent } from "./WeatherComponent";
import { MapComponent } from "./MapComponent";
import { HistoryComponent } from "./HistoryComponent";
import { AppState } from "../types/component";
import { Geo } from "../api/Geo";
import { Config } from "../config/Config";
import { Weather } from "../api/Weather";
import { GeoData } from "../types/geo";
import { normalizeTarget, normalizeWeather } from "../helpers/utils";
import { History } from "../api/History";

export class App extends Component<AppState> {
  protected config = new Config();

  protected state = <AppState>{ title: "Прогноз погоды" };

  constructor(root: HTMLElement, initialState?: Partial<AppState>) {
    super(root);
    this.setState({ ...this.state, ...initialState });
  }

  protected render(): string {
    return this.templater.template(
      [
        '<div class="widget" id="widget">',
        '<span class="widget__title">{{title}}</span>',
        '<div class="top" id="top">',
        '<div class="search" id="search"></div>',
        '<div class="weather" id="weather"></div>',
        "</div>",
        '<div class="bottom" id="bottom">',
        '<div class="map" id="map"></div>',
        '<div class="history" id="history"></div>',
        "</div>",
        "</div>",
      ].join(""),
      this.state
    );
  }

  protected async onMount(): Promise<void> {
    super.onMount();
    const searchComponent = new SearchComponent(
      <HTMLElement>document.getElementById("search")
    );

    try {
      const userGeo = await new Geo(this.config).getGeo();
      const userWeather = await new Weather(this.config).getWeather(
        <GeoData>userGeo
      );

      const weatherComponent = new WeatherComponent(
        <HTMLElement>document.getElementById("weather"),
        normalizeWeather(userWeather)
      );
      const mapComponent = new MapComponent(
        <HTMLElement>document.getElementById("map"),
        normalizeTarget(userWeather)
      );
      const historyComponent = new HistoryComponent(
        <HTMLElement>document.getElementById("history")
      );

      searchComponent.on("weather:display", weatherComponent.setState);
      searchComponent.on("map:display", mapComponent.setState);
      // searchComponent.on("info:display", searchComponent.setState);
    } catch (error) {
      searchComponent.setState({
        infoType: "error",
        infoText: "При запросе погоды произошла ошибка",
      });
    }
  }
}
