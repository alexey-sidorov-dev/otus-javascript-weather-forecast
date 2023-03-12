import { Storage } from "../src/api/Storage";
import { Config } from "../src/config/Config";
import { makeDataIdentifier } from "../src/helpers/utils";
import { HistoryData } from "../src/types/api";

describe("Storage", () => {
  const config = new Config();
  const storage = new Storage({
    dataIdentifier: makeDataIdentifier(config.historyDataIdentifierPrefix),
    itemsCount: config.historyItemsCount,
  });
  const data1: HistoryData = { city: "City1" };
  const data2: HistoryData = { city: "City2" };
  const cities: Array<HistoryData> = [
    { city: "City11" },
    { city: "City12" },
    { city: "City13" },
    { city: "City14" },
    { city: "City15" },
    { city: "City16" },
    { city: "City17" },
    { city: "City18" },
    { city: "City19" },
  ];

  afterEach(() => {
    storage.clear();
  });

  it("should read empty data", () => {
    expect(storage.read()).toStrictEqual([]);
  });

  it("should add city to the beginnig", () => {
    storage.update(data1);
    storage.update(data2);

    expect(storage.read()).toStrictEqual([data2, data1]);
  });

  it("should save no more then 10 items in the history", () => {
    cities.forEach((item) => {
      storage.update(item);
    });
    storage.update(data1);
    storage.update(data2);
    const data = storage.read();

    expect(data).toStrictEqual([
      data2,
      data1,
      { city: "City19" },
      { city: "City18" },
      { city: "City17" },
      { city: "City16" },
      { city: "City15" },
      { city: "City14" },
      { city: "City13" },
      { city: "City12" },
    ]);
  });

  it("should not repeat items in the history", () => {
    storage.update(data1);
    storage.update(data2);
    storage.update(data1);

    expect(storage.read()).toStrictEqual([data1, data2]);
  });

  it("should delete data from history", () => {
    storage.update(data1);
    storage.update(data2);
    storage.delete(data1);
    expect(storage.read()).toStrictEqual([data2]);
  });

  it("should clear data from history", () => {
    storage.update(data1);
    storage.update(data2);
    storage.clear();
    expect(storage.read()).toStrictEqual([]);
  });
});
