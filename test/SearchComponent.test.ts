/* eslint-disable no-new */
import { SearchComponent } from "../src/components/SearchComponent";
import { SearchState } from "../src/types/component";

describe("SearchComponent", () => {
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
    const search = new SearchComponent(element);

    expect(SearchComponent).toBeInstanceOf(Function);
    expect(search).toBeInstanceOf(SearchComponent);
  });

  it("should initialize SearchComponent without initial state", () => {
    const defaultState: SearchState = {
      infoType: "info",
      infoText: "Запрашиваем погоду в вашем городе...",
    };
    const setStateSpy = jest.spyOn(SearchComponent.prototype, "setState");
    new SearchComponent(element);

    expect(setStateSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).toHaveBeenCalledWith(defaultState);
    expect(element.innerHTML).toBe(
      `<input id="input" class="search__input" placeholder="Город">` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>` +
        `<div id="info" class="search__info search-info">` +
        `<span class="search-info__info">Запрашиваем погоду в вашем городе...</span>` +
        `</div>`
    );
  });

  it("should initialize SearchComponent state with initial state", () => {
    const defaultState: SearchState = {
      infoType: "info",
      infoText: "Запрашиваем погоду в вашем городе...",
    };
    const setStateSpy = jest.spyOn(SearchComponent.prototype, "setState");
    new SearchComponent(element, {
      infoText: "Info",
    });

    expect(setStateSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).toHaveBeenCalledWith({
      ...defaultState,
      ...{
        infoText: "Info",
      },
    });
    expect(element.innerHTML).toBe(
      `<input id="input" class="search__input" placeholder="Город">` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>` +
        `<div id="info" class="search__info search-info"><span class="search-info__info">Info</span></div>`
    );
  });

  it("should set SearchComponent state", () => {
    const defaultState: SearchState = {
      infoType: "info",
      infoText: "Запрашиваем погоду в вашем городе...",
    };
    const setStateSpy = jest.spyOn(SearchComponent.prototype, "setState");

    const search = new SearchComponent(element);

    expect(setStateSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).toHaveBeenLastCalledWith({ ...defaultState });

    jest.spyOn(search, "setState");
    search.setState({
      infoType: "error",
      infoText: "Error",
    });

    expect(search.setState).toHaveBeenCalledTimes(2);
    expect(search.setState).toHaveBeenLastCalledWith({
      ...defaultState,
      ...{
        infoType: "error",
        infoText: "Error",
      },
    });
    expect(element.innerHTML).toBe(
      `<input id="input" class="search__input" placeholder="Город">` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>` +
        `<div id="info" class="search__info search-info"><span class="search-info__error">Error</span></div>`
    );
  });
});
