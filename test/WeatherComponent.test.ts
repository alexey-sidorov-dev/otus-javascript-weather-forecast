/* eslint-disable no-new */
import { WeatherComponent } from "../src/components/WeatherComponent";

describe("WeatherComponent", () => {
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
    const weather = new WeatherComponent(element);

    expect(WeatherComponent).toBeInstanceOf(Function);
    expect(weather).toBeInstanceOf(WeatherComponent);
  });

  it("should initialize WeatherComponent without initial state", () => {
    new WeatherComponent(element);

    expect(element.innerHTML).toBe(
      `<img class="weather__icon" src="https://www.weatherbit.io/static/img/icons/.png" alt="icon">` +
        `<span class="weather__description">` +
        `, Температура: °C, Влажность: %` +
        `</span>`
    );
  });

  it("should initialize WeatherComponent state with initial state", () => {
    const description = String(Math.random());
    const temperature = Math.random();
    const humidity = Math.random();
    const icon = String(Math.random());

    new WeatherComponent(element, {
      description,
      temperature,
      humidity,
      icon,
    });

    expect(element.innerHTML).toBe(
      `<img class="weather__icon" src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="icon">` +
        `<span class="weather__description">` +
        `${description}, Температура: ${temperature}°C, Влажность: ${humidity}%` +
        `</span>`
    );
  });

  it("should update WeatherComponent state", () => {
    const temperature = Math.random();
    const humidity = Math.random();
    const description = String(Math.random());
    const icon = String(Math.random());
    const weatherData = {
      data: [
        {
          wind_cdir: "NE",
          rh: humidity,
          pod: "d",
          lon: -78.63861,
          pres: 1006.6,
          timezone: "America/New_York",
          ob_time: "2017-08-28 16:45",
          country_code: "US",
          clouds: 75,
          vis: 10,
          wind_spd: 6.17,
          gust: 8,
          wind_cdir_full: "northeast",
          app_temp: 24.25,
          state_code: "NC",
          ts: 1503936000,
          h_angle: 0,
          dewpt: 15.65,
          weather: {
            icon,
            code: 803,
            description,
          },
          uv: 2,
          aqi: 45,
          station: "CMVN7",
          sources: ["rtma", "CMVN7"],
          wind_dir: 50,
          elev_angle: 63,
          datetime: "2017-08-28:17",
          precip: 0,
          ghi: 444.4,
          dni: 500,
          dhi: 120,
          solar_rad: 350,
          city_name: "Raleigh",
          sunrise: "10:44",
          sunset: "23:47",
          temp: temperature,
          lat: 35.7721,
          slp: 1022.2,
        },
      ],
    };
    const weather = new WeatherComponent(element);

    jest.spyOn(weather, "setState");
    weather.updateState(weatherData);

    expect(weather.setState).toHaveBeenCalledTimes(1);
    expect(weather.setState).toHaveBeenCalledWith({
      description,
      humidity,
      icon,
      temperature,
    });
  });
});
