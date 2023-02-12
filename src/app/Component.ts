import { Events } from "../types/events";
import { GenericObject } from "../types/objects";

export abstract class Component<State = GenericObject> {
  private element: HTMLElement;

  protected state: State = {} as State;

  protected events: Events = {} as Events;

  constructor(element: HTMLElement, initialState?: Partial<State>) {
    this.element = element;
    this.state = initialState ? (initialState as State) : this.state;
    setTimeout(() => {
      this.element.innerHTML = this.render();
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
        if ((event.target as HTMLElement).matches(selector)) {
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
