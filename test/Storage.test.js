import { Storage } from "../src/app/Storage";
import { Config } from "../src/app/Config";

describe("History", () => {
  const config = new Config();
  const storage = new Storage(config);
  const city1 = "City1";
  const city2 = "City2";
  const cities = [
    "City11",
    "City12",
    "City13",
    "City14",
    "City15",
    "City16",
    "City17",
    "City18",
    "City19",
  ];

  afterEach(() => {
    storage.clear();
  });

  it("should read empty data", () => {
    expect(storage.read()).toStrictEqual([]);
  });

  it("should add city to the beginnig", () => {
    storage.update(city1);
    storage.update(city2);

    expect(storage.read()).toStrictEqual([city2, city1]);
  });

  it("should save no more then 10 items in the history", () => {
    cities.forEach((item) => {
      storage.update(item);
    });
    storage.update(city1);
    storage.update(city2);
    const data = storage.read();

    expect(data).toStrictEqual([
      city2,
      city1,
      "City19",
      "City18",
      "City17",
      "City16",
      "City15",
      "City14",
      "City13",
      "City12",
    ]);
  });

  it("should not repeat items in the history", () => {
    storage.update(city1);
    storage.update(city2);
    storage.update(city1);

    expect(storage.read()).toStrictEqual([city1, city2]);
  });

  it("should clear data from history", () => {
    storage.update(city1);
    storage.update(city2);
    storage.clear();
    expect(storage.read()).toStrictEqual([]);
  });
});
