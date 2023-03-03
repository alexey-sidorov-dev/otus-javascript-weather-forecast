import { Component } from "./Component";
import { SearchComponent } from "./SearchComponent";
import { WeatherComponent } from "./WeatherComponent";
import { MapComponent } from "./MapComponent";
import { HistoryComponent } from "./HistoryComponent";
import { AppState, Events } from "../types/component";
import { Geo } from "../api/Geo";
import { Config } from "../config/Config";
import { Weather } from "../api/Weather";
import { IGeoData } from "../types/geo";
import { normalizeTarget, normalizeWeather } from "../helpers/utils";
import { History } from "../api/History";

export class App extends Component<AppState> {
  protected config = new Config();

  protected geo = new Geo(this.config);

  protected weather = new Weather(this.config);

  protected history = new History(this.config);

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
    /* eslint-disable no-new */
    const search = new SearchComponent(
      <HTMLElement>document.getElementById("search"),
      {},
      {
        "search:weather": [
          () => {
            console.log(Date.now());
          },
        ],
      }
    );

    try {
      const userGeo = await this.geo.getGeo();
      const userWeather = await this.weather.getWeather(<IGeoData>userGeo);

      new WeatherComponent(
        <HTMLElement>document.getElementById("weather"),
        normalizeWeather(userWeather)
      );
      new MapComponent(
        <HTMLElement>document.getElementById("map"),
        normalizeTarget(userWeather)
      );
      new HistoryComponent(<HTMLElement>document.getElementById("history"), {
        data: await this.history.read(),
      });
    } catch (error) {
      search.setState({
        infoType: "error",
        infoText: "При запросе погоды произошла ошибка",
      });
    }
  }
}
