import fetchMock from "jest-fetch-mock";
import { Weather } from "../src/api/Weather";
import { Config } from "../src/config/Config";
import { HttpError } from "../src/helpers/HttpError";
import { DataError } from "../src/helpers/DataError";
import { NoErrorThrownError } from "./helpers/NoErrorThrownError";
import { getError } from "./helpers/utils";
import { WeatherData } from "../src/types/api";

describe("Weather", () => {
  const config = new Config();
  const apiUrl = config.weatherApiUrl;
  const weather = new Weather(config);

  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.doMock();
  });

  it("should be called with correct url", async () => {
    const city = String(Math.random());
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    await weather.getWeather({ city });

    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}?key=${config.weatherApiKey}&units=${config.units}&lang=${config.language}&city=${city}`
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return weather data for city", async () => {
    const city = String(Math.random());
    const expected: WeatherData = {
      data: [
        {
          app_temp: -22.3,
          lat: 57.6197,
          lon: 39.8546,
          rh: 79,
          temp: -17.3,
          city_name: city,
          country_code: "RU",
          weather: {
            code: 803,
            description: "Облачно с прояснениями",
            icon: "c03d",
          },
        },
      ],
    };

    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: [
          {
            app_temp: -22.3,
            lat: 57.6197,
            lon: 39.8546,
            rh: 79,
            temp: -17.3,
            city_name: city,
            country_code: "RU",
            weather: {
              code: 803,
              description: "Облачно с прояснениями",
              icon: "c03d",
            },
          },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
    const result = await weather.getWeather({ city });

    expect(result).toStrictEqual(expected);
  });

  it("should throw error with invalid geo params", async () => {
    const error = await getError(async () => weather.getWeather({ city: "" }));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(DataError);
  });

  it("should return error for unsuccessful 404 request", async () => {
    const geo = { city: String(Math.random()) };
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 404,
      headers: { "content-type": "application/json" },
    });

    const error = await getError(async () => weather.getWeather(geo));

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(HttpError);

    expect(error).toEqual(
      new HttpError(`При запросе погоды в городе ${geo.city} произошла ошибка`)
    );
  });

  it("should return error for unsuccessful 204 request", async () => {
    const city = String(Math.random());
    const geo = { city };
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 204,
      headers: { "content-type": "application/json" },
    });

    const error = await getError(async () => weather.getWeather({ city }));

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(HttpError);

    expect(error).toEqual(
      new HttpError(`Не найдены данные о погоде в городе ${geo.city}`)
    );
  });
});
