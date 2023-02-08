import { App } from "../src/app/App";

describe("Widget", () => {
  let root;
  const app = new App();
  const { widget, history } = app;

  beforeAll(() => {
    root = document.createElement("div");
    root.setAttribute("id", "app");
    root.setAttribute("className", "app");
    document.body.append(root);
    app.root = root;
  });

  afterEach(() => {
    document.getElementById("widget")?.remove();
    widget.target = {};
    history.clear();
  });

  afterAll(() => {
    document.getElementById("app")?.remove();
  });

  it("should correct display weather by displayWeather", async () => {
    const weatherData = {
      data: [
        {
          city_name: "Raleigh",
          country_code: "US",
          lat: 35.7721,
          lon: -78.63861,
          rh: 59,
          temp: 24.19,
          weather: {
            description: "Broken clouds",
          },
        },
      ],
    };

    const expectedHTML = [
      '<div class="weather" id="weather">',
      '<span class="weather__description">Broken clouds, Температура: 24.19°C, Влажность: 59%</span>',
      "</div>",
    ].join("");
    app.createInitLayout();
    widget.weatherContainer = document.getElementById("weather");
    await widget.displayWeather(weatherData);

    expect(widget.weatherContainer.outerHTML).toStrictEqual(expectedHTML);
  });

  it("should correct display history list by displayHistoryList", async () => {
    history.update("Barcelona");
    history.update("Paris");
    history.update("London");

    app.createInitLayout();
    widget.historyContainer = document.getElementById("history");
    await widget.displayHistoryList();

    expect(widget.historyContainer.innerHTML).toStrictEqual(
      [
        '<ul class="history-list">',
        '<li class="history-list__item">London</li>',
        '<li class="history-list__item">Paris</li>',
        '<li class="history-list__item">Barcelona</li>',
        "</ul>",
      ].join("")
    );

    history.clear();
    await widget.displayHistoryList();
    expect(widget.historyContainer.innerHTML).toBe(
      '<ul class="history-list"></ul>'
    );
  });

  it("should correct display history by displayHistory", async () => {
    history.update("Barcelona");
    history.update("Paris");
    history.update("London");

    const expectedHTML = [
      '<div class="history" id="history">',
      '<ul class="history-list">',
      '<li class="history-list__item">London</li>',
      '<li class="history-list__item">Paris</li>',
      '<li class="history-list__item">Barcelona</li>',
      "</ul>",
      "</div>",
    ].join("");

    app.createInitLayout();
    widget.historyContainer = document.getElementById("history");
    await widget.displayHistory();
    expect(widget.historyContainer.outerHTML).toStrictEqual(expectedHTML);
  });

  it("should correct display search by displaySearch", () => {
    app.createInitLayout();
    widget.searchContainer = document.getElementById("search");

    widget.displaySearch();
    expect(widget.info.outerHTML).toBe(
      [
        '<div id="info" class="search__info search-info">',
        '<span class="search-info__info">Запрашиваем погоду в вашем городе...</span>',
        "</div>",
      ].join("")
    );

    root.replaceChildren();
    widget.displaySearch();
    expect(document.getElementById("search")).toBeNull();
  });

  it("should correct display info by displaySearchInfo", () => {
    widget.info = document.createElement("div");
    root.append(widget.info);

    widget.displaySearchInfo();
    expect(widget.info.outerHTML).toBe("<div></div>");

    widget.info.replaceChildren();
    widget.displaySearchInfo("0");
    expect(widget.info.outerHTML).toBe(
      '<div><span class="search-info__info">0</span></div>'
    );

    widget.info.replaceChildren();
    widget.displaySearchInfo("test");
    expect(widget.info.outerHTML).toBe(
      '<div><span class="search-info__info">test</span></div>'
    );
  });

  it("should correct display error by displaySearchError", () => {
    widget.info = document.createElement("div");

    widget.displaySearchError();
    expect(widget.info.outerHTML).toBe("<div></div>");

    widget.info.replaceChildren();
    widget.displaySearchError("0");
    expect(widget.info.outerHTML).toBe(
      '<div><span class="search-info__error">0</span></div>'
    );

    widget.info.replaceChildren();
    widget.displaySearchError("test");
    expect(widget.info.outerHTML).toBe(
      '<div><span class="search-info__error">test</span></div>'
    );

    widget.info.remove();
  });

  it("should correct display map by displayMap", () => {
    app.createInitLayout();
    widget.mapContainer = document.getElementById("map");

    widget.displayMap({ latitude: 35.7721, longitude: -78.63861 });
    expect(document.getElementById("map")).not.toBeNull();
  });

  it("should correct display initial app by displayInitApp", async () => {
    app.createInitLayout();
    await widget.displayInitApp();

    expect(document.querySelector("input")).not.toBeNull();
    expect(document.querySelector("button")).not.toBeNull();
    expect(document.querySelector("ul")).not.toBeNull();
  });
});
