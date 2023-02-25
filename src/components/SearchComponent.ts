import { Events, SearchState } from "../types/component";
import { Component } from "./Component";

export class SearchComponent extends Component<SearchState> {
  protected state: SearchState = {
    infoType: "info",
    infoText: "",
  };

  protected events: Events = {
    "click@#button": this.buttonClick,
    "keypress@#input": this.inputKeypress,
  };

  constructor(element: HTMLElement, initialState?: Partial<SearchState>) {
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

  private buttonClick() {
    console.log("buttonClick", this.state);
  }

  private inputKeypress() {
    console.log("inputKeypress", this.state);
  }
}
