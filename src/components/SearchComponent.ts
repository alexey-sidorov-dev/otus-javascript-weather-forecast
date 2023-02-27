import { Events, SearchState } from "../types/component";
import { Component } from "./Component";

export class SearchComponent extends Component<SearchState> {
  private buttonClick = (ev: unknown) => {
    console.log((ev as Event).type);
    console.log("buttonClick", this.state);
  };

  private inputKeypress = (ev: unknown) => {
    console.log("inputKeypress", this.state);
    console.log(ev);
  };

  protected state: SearchState = {
    infoType: "info",
    infoText: "Запрашиваем погоду в вашем городе...",
  };

  protected events: Events = {
    "click@#button": this.buttonClick,
    "keypress@#input": this.inputKeypress,
  };

  constructor(
    element: HTMLElement,
    initialState?: Partial<SearchState>,
    hooks?: GeneratorFunction
  ) {
    super(element);

    this.setState({ ...this.state, ...initialState });
  }

  protected render(): string {
    return this.templater.template(
      `<input id="input" class="search__input" placeholder="Город" autofocus="">` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>` +
        `<div id="info" class="search__info search-info"><span class="search-info__{{infoType}}">{{infoText}}</span>` +
        `</div>`,
      this.state
    );
  }
}
