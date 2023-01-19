import { History } from "../app/History";
import { Config } from "../app/Config";

describe("History", () => {
  const config = new Config();
  const history = new History(config);
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
    history.clear();
  });

  it("should read empty data", () => {
    expect(history.read()).toStrictEqual([]);
  });

  it("should add city to the beginnig", () => {
    history.update(city1);
    history.update(city2);

    expect(history.read()).toStrictEqual([city2, city1]);
  });

  it("should save no more then 10 items in the history", () => {
    cities.forEach((item) => {
      history.update(item);
    });
    history.update(city1);
    history.update(city2);
    const data = history.read();

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
    history.update(city1);
    history.update(city2);
    history.update(city1);

    expect(history.read()).toStrictEqual([city1, city2]);
  });

  it("should clear data from history", () => {
    history.update(city1);
    history.update(city2);
    history.clear();
    expect(history.read()).toStrictEqual([]);
  });
});
