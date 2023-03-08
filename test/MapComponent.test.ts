/* eslint-disable no-new */
import { MapComponent } from "../src/components/MapComponent";
import { MapState } from "../src/types/component";

describe("MapComponent", () => {
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
    const map = new MapComponent(element);

    expect(MapComponent).toBeInstanceOf(Function);
    expect(map).toBeInstanceOf(MapComponent);
  });

  it("should set MapComponent state", () => {
    const latitude = Math.random();
    const longitude = Math.random();
    const newState: Partial<MapState> = {
      latitude,
      longitude,
    };
    const map = new MapComponent(element);

    jest.spyOn(map, "setState");
    map.setState(newState);

    expect(map.setState).toHaveBeenCalledTimes(1);
    expect(map.setState).toHaveBeenLastCalledWith({
      latitude,
      longitude,
    });
  });

  it("should update MapComponent state", () => {
    const latitude = Math.random();
    const longitude = Math.random();
    const temp = Math.random();
    const rh = Math.random();
    const city = String(Math.random());
    const country = String(Math.random());
    const weatherData = {
      data: [
        {
          wind_cdir: "NE",
          rh,
          pod: "d",
          lon: longitude,
          pres: 1006.6,
          timezone: "America/New_York",
          ob_time: "2017-08-28 16:45",
          country_code: country,
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
            icon: "c03d",
            code: 803,
            description: "Broken clouds",
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
          city_name: city,
          sunrise: "10:44",
          sunset: "23:47",
          temp,
          lat: latitude,
          slp: 1022.2,
        },
      ],
    };
    const map = new MapComponent(element);

    jest.spyOn(map, "setState");
    map.updateState(weatherData);

    expect(map.setState).toHaveBeenCalledTimes(1);
    expect(map.setState).toHaveBeenCalledWith({
      city,
      country,
      latitude,
      longitude,
    });
  });
});
