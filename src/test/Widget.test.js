import { App } from "../app/App";

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

  it("should correct display weather by displayWeather", () => {
    const data = {
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
      '<span class="weather__description">Raleigh, US, T: 24.19°C, RH: 59%</span>',
      "<span>Broken clouds</span>",
      "</div>",
    ].join("");
    app.createInitLayout();
    widget.weatherContainer = document.getElementById("weather");
    widget.displayWeather(data);

    expect(widget.weatherContainer.outerHTML).toStrictEqual(expectedHTML);
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

  it("should correct display history list by displayHistoryList", () => {
    history.update("Barcelona");
    history.update("Paris");
    history.update("London");

    app.createInitLayout();
    widget.historyContainer = document.getElementById("history");
    widget.displayHistoryList();

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
    widget.displayHistoryList();
    expect(widget.historyContainer.innerHTML).toBe(
      '<ul class="history-list"></ul>'
    );
  });

  it("should correct display history by displayHistory", () => {
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
    widget.displayHistory();
    expect(widget.historyContainer.outerHTML).toStrictEqual(expectedHTML);
  });

  it("should correct get target by getTarget", () => {
    const data1 = {
      data: [
        {
          city_name: "Raleigh",
          lat: 35.7721,
          lon: -78.63861,
          rh: 59,
          temp: 24.19,
        },
      ],
    };

    const data2 = {
      data: [
        {
          city_name: "Raleigh",
          lon: -78.63861,
          rh: 59,
          temp: 24.19,
        },
      ],
    };

    expect(widget.target).toStrictEqual({});

    widget.setTarget();
    expect(widget.target).toStrictEqual({
      latitude: undefined,
      longitude: undefined,
    });

    widget.setTarget(data1);
    expect(widget.target).toStrictEqual({
      latitude: 35.7721,
      longitude: -78.63861,
    });

    widget.setTarget(data2);
    expect(widget.target).toStrictEqual({
      latitude: undefined,
      longitude: -78.63861,
    });
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
});
