import { App } from "../src/components/App";

describe("App", () => {
  let root: HTMLDivElement;

  beforeAll(() => {
    root = document.createElement("div");
    root.setAttribute("id", "app");
    document.body.append(root);
  });

  afterEach(() => {
    root.replaceChildren();
  });

  afterAll(() => {
    document.body.replaceChildren();
  });

  it("should be a class", () => {
    const app = new App(root);

    expect(App).toBeInstanceOf(Function);
    expect(app).toBeInstanceOf(App);
  });

  it("should create app layout", () => {
    const app = new App(root);

    const expectedHTML = [
      '<div class="widget" id="widget">',
      '<span class="widget__title">Прогноз погоды</span>',
      '<div class="top" id="top">',
      '<div class="search" id="search"></div>',
      '<div class="weather" id="weather"></div>',
      "</div>",
      '<div class="bottom" id="bottom">',
      '<div class="map" id="map"></div>',
      '<div class="history" id="history"></div>',
      "</div>",
      "</div>",
    ].join("");

    expect(root.innerHTML).toStrictEqual(expectedHTML);
  });
});
