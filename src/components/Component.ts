import { Events, ComponentState } from "../types/component";
import { Templater } from "./Templater";

export abstract class Component<State = ComponentState> {
  protected element: HTMLElement;

  protected state: State = <State>{};

  protected events: Events = <Events>{};

  protected templater: Templater;

  constructor(element: HTMLElement, initialState?: Partial<State>) {
    this.element = element;
    this.templater = new Templater();
    setTimeout(() => {
      this.setState(<State>initialState);
      this.onMount();
    }, 0);
  }

  setState(patch: Partial<State>): void {
    this.state = { ...this.state, ...patch };
    this.element.innerHTML = this.render();
  }

  private subscribe(): void {
    Object.keys(this.events).forEach((key) => {
      const [eventName, selector] = key.split("@");
      this.element.addEventListener(eventName, (event) => {
        if ((<HTMLElement>event.target).matches(selector)) {
          this.events[key](event);
        }
      });
    });
  }

  protected onMount(): void {
    this.subscribe();
  }

  protected abstract render(): string;
}
