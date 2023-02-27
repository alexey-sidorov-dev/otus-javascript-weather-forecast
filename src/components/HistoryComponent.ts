import { Events, HistoryState } from "../types/component";
import { Config } from "../config/Config";
import { Component } from "./Component";

export class HistoryComponent extends Component<HistoryState> {
  protected state: HistoryState = {} as HistoryState;

  protected events: Events = {};

  constructor(container: HTMLElement, initialState?: Partial<HistoryState>) {
    super(container);

    const { historyItemsCount: itemsCount } = new Config();
    this.setState({ itemsCount, ...initialState });
  }

  protected render(): string {
    return this.templater.template(
      `<ul class="history-list">` +
        // FIXME:
        `{{for data}}<li class="history-list__item">{{city}}</li>{{end for}}` +
        `</ul>`,
      this.state.data
    );
  }
}
