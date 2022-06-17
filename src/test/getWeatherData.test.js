import { getWeatherData } from "../app/getWeatherData";
import { HttpError } from "../utils/HttpError";
import { DataError } from "../utils/DataError";
import { NoErrorThrownError } from "../utils/NoErrorThrownError";
import { getError } from "../utils/helpers";

describe("getWeatherData", () => {
  const key = "a3ec23828a024080b68d50315d06d2f9";
  const units = "M";
  const lang = "ru";
  const city = "Moscow";
  const latitude = 55.68455;
  const longitude = 37.62203;
  const url = {
    geo: [
      `https://api.weatherbit.io/v2.0/current?lat=${latitude}`,
      `lon=${longitude}`,
      `key=${key}`,
      `units=${units}`,
      `lang=${lang}`,
    ].join("&"),
    city: [
      `https://api.weatherbit.io/v2.0/current?city=${city}`,
      `key=${key}`,
      `units=${units}`,
      `lang=${lang}`,
    ].join("&"),
  };
  let fetchMock;

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it("should be called with url for geo coordinates", async () => {
    fetchMock = jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: true })
    );
    // TODO:
    const params = {
      type: "geo",
      latitude: 55.68455,
      longitude: 37.62203,
    };
    await getWeatherData(params);

    expect(fetchMock).toHaveBeenCalledWith(url.geo);
  });

  it("should be called with url for city name", async () => {
    fetchMock = jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: true })
    );
    const params = { type: "city", city: "Moscow" };
    await getWeatherData(params);

    expect(fetchMock).toHaveBeenCalledWith(url.city);
  });

  it("should return weather data for geo request", async () => {
    // TODO:
    const expected = {
      main: {
        temp: 2.85,
        feels_like: 1.2,
        humidity: 95,
      },
      weather: [
        { main: "Clouds", description: "переменная облачность", icon: "03n" },
      ],
    };
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve(expected), ok: true })
    );
    // TODO:
    const params = {
      type: "geo",
      latitude: 55.68455,
      longitude: 37.62203,
    };

    const result = await getWeatherData(params);

    expect(result).toStrictEqual(expected);
  });

  it("should return weather data for city request", async () => {
    // TODO:
    const expected = {
      main: {
        temp: 2.85,
        feels_like: 1.2,
        humidity: 95,
      },
      weather: [
        { main: "Clouds", description: "переменная облачность", icon: "03n" },
      ],
    };
    const params = { type: "city", city: "Moscow" };

    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve(expected), ok: true })
    );
    const result = await getWeatherData(params);

    expect(result).toStrictEqual(expected);
  });

  it("should throw error with invalid params", async () => {
    const error = await getError(async () => getWeatherData());
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(DataError);
  });

  it("should return error for unsuccessful request", async () => {
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: false })
    );
    const error = await getError(async () => getWeatherData({}));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(HttpError);
  });
});
