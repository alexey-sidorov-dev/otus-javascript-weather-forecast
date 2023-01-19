import { Weather } from "../app/Weather";
import { Config } from "../app/Config";
import { HttpError } from "../utils/HttpError";
import { DataError } from "../utils/DataError";
import { NoErrorThrownError } from "../utils/NoErrorThrownError";
import { getError } from "../utils/helpers";

describe("Weather", () => {
  let fetchMock;
  const config = new Config();
  const apiUrl = config.weatherApiUrl;
  const weather = new Weather(config);

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it("should be called with correct url", async () => {
    fetchMock = jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: true })
    );
    await weather.getWeather({ city: "Moscow" });

    expect(fetchMock).toHaveBeenCalledWith(
      `${apiUrl}?key=${config.weatherApiKey}&units=${config.units}&lang=${config.language}&city=Moscow`
    );
  });

  it("should return weather data for city", async () => {
    const expected = {
      main: {
        app_temp: -22.3,
        lat: 57.6197,
        lon: 39.8546,
        rh: 79,
        temp: -17.3,
      },
      weather: [
        { code: 803, description: "Облачно с прояснениями", icon: "c03d" },
      ],
    };

    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve(expected), ok: true })
    );
    const result = await weather.getWeather({ city: "Moscow" });

    expect(result).toStrictEqual(expected);
  });

  it("should throw error with invalid geo params", async () => {
    const error = await getError(async () =>
      weather.getWeather({ key: "value" })
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(DataError);
  });

  it("should return error for unsuccessful request", async () => {
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: false })
    );
    const error = await getError(async () =>
      weather.getWeather({ city: "Moscow" })
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(HttpError);
  });
});
