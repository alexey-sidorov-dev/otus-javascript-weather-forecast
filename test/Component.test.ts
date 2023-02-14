/* eslint-disable class-methods-use-this, max-classes-per-file, no-new */
import { Component } from "../src/app/components/Component";
import { sleep } from "./helpers/sleep";

describe("Component", () => {
  let element: HTMLDivElement;
  let root: HTMLDivElement;

  beforeAll(() => {
    root = document.createElement("div");
    root.setAttribute("id", "app");
    document.body.append(root);
  });

  beforeEach(() => {
    element = document.createElement("div");
    root.append(element);
  });

  afterEach(() => {
    root.replaceChildren();
  });

  it("should be a Component class", () => {
    class TestComponent extends Component {
      render() {
        return "";
      }
    }
    const component = new TestComponent(element);

    expect(Component).toBeInstanceOf(Function);
    expect(component).toBeInstanceOf(Component);
  });

  it("should render component", async () => {
    const text = `${Math.random()}`;
    class TestComponent extends Component {
      render() {
        return `<span>${text}</span>`;
      }
    }

    new TestComponent(element);
    await sleep(42);

    expect(element.innerHTML).toBe(`<span>${text}</span>`);
  });

  it("should render component from class state", async () => {
    const text = `${Math.random()}`;
    class TestComponent extends Component {
      state = {
        text,
      };

      render() {
        return `<span>${this.state.text}</span>`;
      }
    }

    new TestComponent(element, null);
    await sleep(42);

    expect(element.innerHTML).toBe(`<span>${text}</span>`);
  });

  it("should render component from initial state", async () => {
    type S = { text: string; number: number };
    const number = 42;
    const text = `${Math.random()}`;
    const newText = `${Math.random()}`;
    class TestComponent extends Component {
      state: S = {
        text,
        number,
      };

      constructor(el: HTMLElement, initialState?: Partial<S>) {
        super(el);
        this.state = initialState ? (initialState as S) : this.state;
      }

      render() {
        return `<span>${this.state.text}</span>`;
      }
    }

    const component = new TestComponent(element, { text: newText });
    await sleep(42);

    expect(component.state).toEqual({ text: newText });
    expect(element.innerHTML).toBe(`<span>${newText}</span>`);
  });

  it("should update presentation on setState call", async () => {
    const number = 42;
    const text = `${Math.random()}`;
    const newText = `${Math.random()}`;
    class TestComponent extends Component {
      state = {
        text,
        number,
      };

      render() {
        return `<span>${this.state.text}|${this.state.number}</span>`;
      }
    }

    const component = new TestComponent(element);
    await sleep(42);

    component.setState({
      text: newText,
    });

    expect(component.setState).toBeInstanceOf(Function);
    expect(component.state).toEqual({ text: newText, number });
    expect(element.innerHTML).toBe(`<span>${newText}|42</span>`);
  });

  it("calls events from `.events` declaration", async () => {
    const onSpanClick = jest.fn();
    const onButtonClick = jest.fn();
    const onButtonXClick = jest.fn();

    class TestComponent extends Component {
      onSpanClick = onSpanClick;

      onButtonClick = onButtonClick;

      onButtonXClick = onButtonXClick;

      events = {
        "click@span": this.onSpanClick,
        "click@button": this.onButtonClick,
        "click@button.x": this.onButtonXClick,
      };

      render() {
        return `
            <span>42</span>
            <button>X</button>
            <button class="x">Y</button>
          `;
      }
    }

    new TestComponent(element);
    await sleep(42);

    expect(onSpanClick).not.toHaveBeenCalled();
    expect(onButtonClick).not.toHaveBeenCalled();
    expect(onButtonXClick).not.toHaveBeenCalled();

    element.querySelector("span")?.click();
    expect(onSpanClick).toHaveBeenCalledTimes(1);

    element.querySelector("span")?.dispatchEvent(
      new window.Event("click", {
        bubbles: true,
      })
    );
    expect(onSpanClick).toHaveBeenCalledTimes(2);

    element.querySelector("button")?.click();
    expect(onButtonClick).toHaveBeenCalledTimes(1);

    const buttonX = element.querySelector("button.x") as HTMLButtonElement;
    buttonX?.click();
    expect(onButtonClick).toHaveBeenCalledTimes(2);
    expect(onButtonXClick).toHaveBeenCalledTimes(1);
  });
});
