import { Component } from "./Component";

import { SearchComponent } from "./SearchComponent";
import { WeatherComponent } from "./WeatherComponent";
import { MapComponent } from "./MapComponent";
import { HistoryComponent } from "./HistoryComponent";
import { AppState } from "../types/component";

export class App extends Component<AppState> {
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

  protected onMount(): void {
    super.onMount();
    /* eslint-disable no-new */
    new SearchComponent(<HTMLElement>document.getElementById("search"));
    new WeatherComponent(<HTMLElement>document.getElementById("weather"));
    new MapComponent(<HTMLElement>document.getElementById("map"));
    new HistoryComponent(<HTMLElement>document.getElementById("history"));
  }
}
