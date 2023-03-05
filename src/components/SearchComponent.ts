import { Events, SearchState } from "../types/component";
import { Component } from "./Component";
import { Weather } from "../api/Weather";
import { Config } from "../config/Config";
import { normalizeTarget, normalizeWeather } from "../helpers/utils";

export class SearchComponent extends Component<SearchState> {
  private button: HTMLButtonElement | undefined;

  private input: HTMLInputElement | undefined;

  private weather: Weather | undefined;

  private buttonClick = async () => {
    if (this.input && this.input.value) {
      try {
        // this.setState({
        //   infoType: "info",
        //   infoText: `Запрашиваем погоду в городе ${this.input.value}`,
        // });
        const data = await this.weather?.getWeather({
          city: this.input.value,
        });
        this.input.value = "";
        this.input.focus();
        const normalizedTarget = normalizeTarget(data);
        const normalizedWeather = normalizeWeather(data);
        // this.emit("info:display", {
        //   infoType: "info",
        //   infoText: `Погода в городе ${normalizedTarget.city}, ${normalizedTarget.country}`,
        // });
        this.setState({
          infoType: "info",
          infoText: `Погода в городе ${normalizedTarget.city}, ${normalizedTarget.country}`,
        });
        this.emit("weather:display", normalizedWeather);
        this.emit("map:display", normalizedTarget);
      } catch (error) {
        this.setState({
          infoType: "error",
          infoText: `При запросе погоды произошла ошибка`,
        });
      }
    }
  };

  private inputKeypress = (ev: unknown) => {
    if ((ev as KeyboardEvent).key === "Enter") {
      this.button?.click();
    }
  };

  protected events: Events = {
    "click@#button": this.buttonClick,
    "keypress@#input": this.inputKeypress,
  };

  protected state: SearchState = {
    infoType: "info",
    infoText: "Запрашиваем погоду в вашем городе...",
  };

  constructor(element: HTMLElement, initialState?: Partial<SearchState>) {
    super(element);
    this.setState({ ...this.state, ...initialState });
  }

  setState = (patch: Partial<SearchState>) => {
    this.state = { ...this.state, ...patch };
    this.element.innerHTML = this.render();
  };

  protected onMount(): void {
    super.onMount();
    this.button = <HTMLButtonElement>document.getElementById("button");
    this.input = <HTMLInputElement>document.getElementById("input");
    this.input.focus();
    this.weather = new Weather(new Config());
  }

  protected render(): string {
    return this.templater.template(
      `<input id="input" class="search__input" placeholder="Город">` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>` +
        `<div id="info" class="search__info search-info"><span class="search-info__{{infoType}}">{{infoText}}</span>` +
        `</div>`,
      this.state
    );
  }
}
