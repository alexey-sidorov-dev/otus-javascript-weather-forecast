import {
  Events,
  ComponentState,
  Listeners,
  Listener,
} from "../types/component";
import { Templater } from "./Templater";

export abstract class Component<State = ComponentState> {
  protected element: HTMLElement;

  protected state: State = <State>{};

  protected templater: Templater;

  protected events: Events = <Events>{};

  protected readonly listeners: Listeners = <Listeners>{};

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

  public on(ev: string, listener: Listener): () => void {
    if (typeof this.listeners[ev] !== "object") {
      this.listeners[ev] = [];
    }

    this.listeners[ev].push(listener);
    return () => this.off(ev, listener);
  }

  public off(ev: string, listener: Listener): void {
    if (typeof this.listeners[ev] !== "object") return;

    const idx: number = this.listeners[ev].indexOf(listener);
    if (idx > -1) this.listeners[ev].splice(idx, 1);
  }

  protected emit(ev: string, ...args: any[]): void {
    if (typeof this.listeners[ev] !== "object") return;
    [...this.listeners[ev]].forEach((listener) => listener.apply(this, args));
  }

  protected onMount(): void {
    this.subscribe();
  }

  protected abstract render(): string;
}
