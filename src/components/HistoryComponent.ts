import { Events, HistoryState } from "../types/component";
import { Config } from "../config/Config";
import { Component } from "./Component";
import { History } from "../api/History";
import { HistoryData } from "../types/api";
import { normalizeTarget } from "../helpers/utils";
import { Weather } from "../api/Weather";

export class HistoryComponent extends Component<HistoryState> {
  private history: History | undefined;

  private weather: Weather | undefined;

  protected state: HistoryState = {} as HistoryState;

  private listItemClick = async (ev: Event) => {
    try {
      this.emit("search:display", {
        infoType: "info",
        infoText: `Запрашиваем погоду в городе ${
          (ev.target as HTMLElement).textContent
        }...`,
      });
      const weatherData = await this.weather?.getWeather({
        city: (ev.target as HTMLElement).textContent as string,
      });

      const normalizedTarget = normalizeTarget(weatherData);
      this.emit("info:display", {
        infoType: "info",
        infoText: `Погода в городе ${normalizedTarget.city}, ${normalizedTarget.country}`,
      });
      this.emit("weather:display", weatherData);
      this.emit("map:display", weatherData);
      this.emit("history:display", { city: normalizedTarget.city });
    } catch (error) {
      this.emit("info:display", {
        infoType: "error",
        infoText: `При запросе погоды произошла ошибка`,
      });
    }
  };

  protected events: Events = {
    "click@li.history-list__item": this.listItemClick,
  };

  constructor(element: HTMLElement, initialState?: Partial<HistoryState>) {
    super(element);

    this.history = new History(new Config());
    this.weather = new Weather(new Config());
    const { historyItemsCount: itemsCount } = new Config();
    this.setState({ itemsCount, ...initialState });
  }

  setState(patch: Partial<HistoryState>): void {
    this.state = { ...this.state, ...patch };
    this.element.innerHTML = this.render();
  }

  updateState = async (data: HistoryData) => {
    this.history?.update(data);
    const history = await this.history?.read();
    this.setState({ data: history });
  };

  protected async onMount(): Promise<void> {
    super.onMount();

    const data = await this.history?.read();
    this.setState({ data });
  }

  protected render(): string {
    return this.templater.template(
      `<ul class="history-list">` +
        `{{for data}}<li class="history-list__item">{{city}}</li>{{end for}}` +
        `</ul>`,
      this.state
    );
  }
}
