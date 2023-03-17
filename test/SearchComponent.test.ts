/* eslint-disable no-new */
import { SearchComponent } from "../src/components/SearchComponent";

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
    new SearchComponent(element);

    expect(element.innerHTML).toBe(
      `<input id="input" class="search__input" placeholder="Город" autofocus="">` +
        `<button id="button" class="search__button" type="button">Узнать погоду</button>`
    );
  });
});
