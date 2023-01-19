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

    global.fetch = jest.fn();
  });

  afterEach(() => {
    root.replaceChildren();
  });

  afterAll(() => {
    document.getElementById("app").remove();

    delete global.fetch;
  });

  it("should create app layout", () => {
    app.createInitLayout();
    const expectedHTML = [
      '<div class="widget" id="widget">',
      "<h1>Прогноз погоды</h1>",
      '<div class="search" id="search"></div>',
      '<div class="weather" id="weather"></div>',
      '<div class="map" id="map"></div>',
      '<div class="history" id="history"></div>',
      "</div>",
    ].join("");

    expect(root.innerHTML.trim()).toStrictEqual(expectedHTML.trim());
  });
});
