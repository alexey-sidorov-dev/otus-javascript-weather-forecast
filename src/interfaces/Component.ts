export interface Component<State> {
  el: HTMLElement;
  state: State;
  events: {
    [key: string]: (ev: Event) => void;
  };
  setState(patch: Partial<State>): void;
  onMount(el: HTMLElement): void;
  render(): string;
}
