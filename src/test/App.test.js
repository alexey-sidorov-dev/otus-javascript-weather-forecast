import { App } from "../app/App";

describe("App", () => {
  let root;
  const app = new App();

  beforeAll(() => {
    root = document.createElement("div");
    root.setAttribute("id", "app");
    root.setAttribute("className", "app");
    document.body.append(root);
    app.root = root;
  });

  afterEach(() => {
    root.replaceChildren();
  });

  afterAll(() => {
    document.getElementById("app").remove();
  });

  it("should create app layout", () => {
    app.createInitLayout();
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

    expect(root.innerHTML.trim()).toStrictEqual(expectedHTML.trim());
  });
});
