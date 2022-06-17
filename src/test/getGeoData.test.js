import { getGeoData } from "../app/getGeoData";
import { HttpError } from "../utils/HttpError";
import { NoErrorThrownError } from "../utils/NoErrorThrownError";
import { getError } from "../utils/helpers";

describe("getGeoData", () => {
  const apiKey = "f8577df470f44c429232a2419bf5dc99";
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;
  let fetchMock;

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it("should be called with valid URL", async () => {
    fetchMock = jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: true })
    );

    await getGeoData();
    expect(fetchMock).toHaveBeenCalledWith(url);
  });

  it("should return geo data for successful request", async () => {
    // TODO: add country name - ?
    const expected = {
      city: "Moscow",
      latitude: "55.68455",
      longitude: "37.62203",
    };

    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve(expected), ok: true })
    );

    const result = await getGeoData();
    expect(result).toStrictEqual(expected);
  });

  it("should return error for unsuccessful request", async () => {
    global.fetch.mockResolvedValueOnce(
      Promise.resolve({ json: () => Promise.resolve({}), ok: false })
    );

    const error = await getError(async () => getGeoData());
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(HttpError);
  });
});
