import { Events, Hooks, SearchState } from "../types/component";
import { Component } from "./Component";
import { Weather } from "../api/Weather";
import { Config } from "../config/Config";

export class SearchComponent extends Component<SearchState> {
  private button: HTMLButtonElement | undefined;

  private input: HTMLInputElement | undefined;

  private weather: Weather | undefined;

  // FIXME: add try-catch
  private buttonClick = async () => {
    if (this.input && this.input.value) {
      const data = await this.weather?.getWeather({
        city: this.input.value,
      });
      this.input.value = "";
      this.input?.focus();
      // FIXME: change name
      this.emit("search:weather", data);
      console.log(data);
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

  constructor(
    element: HTMLElement,
    initialState?: Partial<SearchState>,
    hooks?: Hooks
  ) {
    super(element);
    this.hooks = <Hooks>hooks;
    this.setState({ ...this.state, ...initialState });
  }

  protected onMount(): void {
    super.onMount();
    this.button = <HTMLButtonElement>document.getElementById("button");
    this.input = <HTMLInputElement>document.getElementById("input");
    this.weather = new Weather(new Config());
  }

  protected render(): string {
    return this.templater.template(
      `<input id="input" class="search__input" placeholder="Город" autofocus>` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>` +
        `<div id="info" class="search__info search-info"><span class="search-info__{{infoType}}">{{infoText}}</span>` +
        `</div>`,
      this.state
    );
  }
}
