import { Events, ComponentState, Hooks } from "../types/component";
import { Templater } from "./Templater";

export abstract class Component<State = ComponentState> {
  protected element: HTMLElement;

  protected isMounted = false;

  protected state: State = <State>{};

  protected events: Events = <Events>{};

  protected hooks: Hooks = <Hooks>{};

  protected templater: Templater;

  constructor(
    element: HTMLElement,
    initialState?: Partial<State>,
    hooks?: Hooks
  ) {
    this.element = element;
    this.hooks = <Hooks>hooks;
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

  protected emit(event: string, ...args: any[]): void {
    if (typeof this.hooks[event] !== "object" || !this.isMounted) return;

    [...this.hooks[event]].forEach((hook) => hook.apply(this, args));
  }

  protected onMount(): void {
    this.subscribe();
    this.isMounted = true;
  }

  protected abstract render(): string;
}
