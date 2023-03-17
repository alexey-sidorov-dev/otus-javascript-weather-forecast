import { normalizeWeather } from "../helpers/utils";
import { WeatherState } from "../types/component";
import { Component } from "./Component";

export class WeatherComponent extends Component<WeatherState> {
  protected state: WeatherState = <WeatherState>{};

  constructor(element: HTMLElement, initialState?: Partial<WeatherState>) {
    super(element);

    this.setState({ ...this.state, ...initialState });
  }

  setState(patch: Partial<WeatherState>): void {
    this.state = { ...this.state, ...patch };
    this.element.innerHTML = this.render();
  }

  updateState = (data: unknown) => {
    this.setState(normalizeWeather(data));
  };

  protected render(): string {
    return this.templater.template(
      `<img class="weather__icon" src="https://www.weatherbit.io/static/img/icons/{{icon}}.png" alt="icon">` +
        `<span class="weather__description">` +
        `{{description}}, Температура: {{temperature}}°C, Влажность: {{humidity}}%` +
        `</span>`,
      this.state
    );
  }
}
