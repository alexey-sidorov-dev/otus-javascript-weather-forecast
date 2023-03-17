/* eslint-disable no-new */
import { HistoryState } from "../src/types/component";
import { HistoryComponent } from "../src/components/HistoryComponent";

describe("InfoComponent", () => {
  let root: HTMLDivElement;
  let element: HTMLDivElement;

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

  afterAll(() => {
    document.body.replaceChildren();
  });

  it("should be a class", () => {
    const history = new HistoryComponent(element);

    expect(HistoryComponent).toBeInstanceOf(Function);
    expect(history).toBeInstanceOf(HistoryComponent);
  });

  it("should initialize HistoryComponent without initial state", () => {
    new HistoryComponent(element);

    expect(element.innerHTML).toBe(`<ul class="history-list"></ul>`);
  });

  it("should initialize HistoryComponent state with initial state", () => {
    const city = String(Math.random());
    new HistoryComponent(element, { data: [{ city }] });

    expect(element.innerHTML).toBe(
      `<ul class="history-list">` +
        `<li class="history-list__item">${city}</li>` +
        `</ul>`
    );
  });

  it("should set HistoryComponent state", () => {
    const city = String(Math.random());
    const defaultState: HistoryState = { data: [], itemsCount: 42 };
    const history = new HistoryComponent(element, defaultState);

    jest.spyOn(history, "setState");
    history.setState({ data: [{ city }] });

    expect(history.setState).toHaveBeenCalledTimes(1);
    expect(history.setState).toHaveBeenLastCalledWith({
      ...{ data: [{ city }] },
    });
    expect(element.innerHTML).toBe(
      `<ul class="history-list">` +
        `<li class="history-list__item">${city}</li>` +
        `</ul>`
    );
  });
});
