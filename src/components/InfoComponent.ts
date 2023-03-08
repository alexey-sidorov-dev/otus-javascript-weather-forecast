import { InfoState } from "../types/component";
import { Component } from "./Component";

export class InfoComponent extends Component<InfoState> {
  protected state: InfoState = <InfoState>{ infoType: "info" };

  constructor(element: HTMLElement, initialState?: Partial<InfoState>) {
    super(element);

    this.setState({ ...this.state, ...initialState });
  }

  setState(patch: Partial<InfoState>): void {
    this.state = { ...this.state, ...patch };
    this.element.innerHTML = this.render();
  }

  updateState = (patch: Partial<InfoState>) => {
    this.setState(patch);
  };

  protected render(): string {
    return this.templater.template(
      `<span class="info__{{infoType}}">{{infoText}}`,
      this.state
    );
  }
}
