/* eslint-disable no-new */
import { AppComponent as App } from "../src/components/AppComponent";

describe("App", () => {
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
    const app = new App(element);

    expect(App).toBeInstanceOf(Function);
    expect(app).toBeInstanceOf(App);
  });

  it("should create app layout", () => {
    new App(element);

    const expectedHTML = [
      '<div class="widget" id="widget">',
      '<span class="widget__title">Прогноз погоды</span>',
      '<div class="top" id="top">',
      '<div class="search" id="search"></div>',
      '<div class="info" id="info"></div>',
      '<div class="weather" id="weather"></div>',
      "</div>",
      '<div class="bottom" id="bottom">',
      '<div class="map" id="map"></div>',
      '<div class="history" id="history"></div>',
      "</div>",
      "</div>",
    ].join("");

    expect(element.innerHTML).toStrictEqual(expectedHTML);
  });
});
