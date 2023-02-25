import fetchMock from "jest-fetch-mock";
import { Geo } from "../src/api/Geo";
import { Config } from "../src/config/Config";
import { HttpError } from "../src/helpers/HttpError";
import { NoErrorThrownError } from "./helpers/NoErrorThrownError";
import { getError } from "./helpers/utils";

describe("Geo", () => {
  const config = new Config();
  const apiUrl = `${config.geoApiUrl}?apiKey=${config.geoApiKey}`;
  const geo = new Geo(config);

  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.doMock();
  });

  it("should be called with valid URL", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    await geo.getGeo();
    expect(fetch).toHaveBeenCalledWith(`${apiUrl}`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return geo data for successful request", async () => {
    const expected = {
      city: "Moscow",
      latitude: "55.68455",
      longitude: "37.62203",
    };

    fetchMock.mockResponseOnce(
      JSON.stringify({
        city: "Moscow",
        latitude: "55.68455",
        longitude: "37.62203",
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

    const result = await geo.getGeo();
    expect(result).toStrictEqual(expected);
  });

  it("should return error for unsuccessful request", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
    const error = await getError(async () => geo.getGeo());

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(HttpError);
    expect(error).toEqual(
      new HttpError("Ошибка при запросе текущих координат")
    );
  });
});
