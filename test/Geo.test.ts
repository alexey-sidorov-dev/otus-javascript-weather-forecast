import { Geo } from "../src/app/Geo";
import { Config } from "../src/app/Config";
import { HttpError } from "../src/app/helpers/HttpError";
import { NoErrorThrownError } from "./helpers/NoErrorThrownError";
import { getError } from "./helpers/utils";

describe("Geo", () => {
  let fetchMock;
  const config = new Config();
  const apiUrl = `${config.geoApiUrl}?apiKey=${config.geoApiKey}`;
  const geo = new Geo(config);

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it("should be called with valid URL", async () => {
    fetchMock = jest.spyOn(global, "fetch");
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: true })
    );

    await geo.getGeo();
    expect(fetchMock).toHaveBeenCalledWith(`${apiUrl}`);
  });

  it("should return geo data for successful request", async () => {
    const expected = {
      city: "Moscow",
      latitude: "55.68455",
      longitude: "37.62203",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve(expected), ok: true })
    );

    const result = await geo.getGeo();
    expect(result).toStrictEqual(expected);
  });

  it("should return error for unsuccessful request", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: false })
    );
    const error = await getError(async () => geo.getGeo());
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(HttpError);
  });
});
