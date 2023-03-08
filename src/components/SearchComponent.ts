import { SearchState, Events } from "../types/component";
import { Component } from "./Component";
import { Weather } from "../api/Weather";
import { Config } from "../config/Config";
import { normalizeTarget } from "../helpers/utils";

export class SearchComponent extends Component<SearchState> {
  private button: HTMLButtonElement | undefined;

  private input: HTMLInputElement | undefined;

  private weather: Weather | undefined;

  protected state: SearchState = <SearchState>{};

  private buttonClick = async () => {
    if (this.input?.value) {
      try {
        this.emit("search:display", {
          infoType: "info",
          infoText: `Запрашиваем погоду в городе ${this.input.value}...`,
        });
        const weatherData = await this.weather?.getWeather({
          city: this.input.value,
        });
        this.input.value = "";
        this.input.focus();
        const normalizedTarget = normalizeTarget(weatherData);

        this.emit("info:display", {
          infoType: "info",
          infoText: `Погода в городе ${normalizedTarget?.city}, ${normalizedTarget?.country}`,
        });
        this.emit("weather:display", weatherData);
        this.emit("map:display", weatherData);
        this.emit("history:display", { city: normalizedTarget?.city });
      } catch (error) {
        this.emit("info:display", {
          infoType: "error",
          infoText: `При запросе погоды произошла ошибка`,
        });
      }
    }
  };

  private inputKeypress = (ev: Event) => {
    if ((ev as KeyboardEvent).key === "Enter") {
      this.button?.click();
    }
  };

  protected events: Events = {
    "click@#button": this.buttonClick,
    "keypress@#input": this.inputKeypress,
  };

  constructor(element: HTMLElement, initialState?: Partial<SearchState>) {
    super(element);

    this.setState({ ...this.state, ...initialState });
  }

  setState(patch: Partial<SearchState>): void {
    this.state = { ...this.state, ...patch };
    this.element.innerHTML = this.render();
  }

  protected onMount(): void {
    super.onMount();

    this.weather = new Weather(new Config());
    this.button = <HTMLButtonElement>document.getElementById("button");
    this.input = <HTMLInputElement>document.getElementById("input");
    this.input.focus();
  }

  protected render(): string {
    return this.templater.template(
      `<input id="input" class="search__input" placeholder="Город" autofocus>` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>` +
        `</div>`
    );
  }
}
