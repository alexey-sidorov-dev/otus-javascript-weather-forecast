import { History } from "../src/api/History";
import { Config } from "../src/config/Config";
import { HistoryData } from "../src/types/api";

describe("History", () => {
  const history = new History(new Config());
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
    history.clear();
  });

  it("should read empty data", async () => {
    expect(await history.read()).toStrictEqual([]);
  });

  it("should add city to the beginnig", async () => {
    await history.update(data1);
    await history.update(data2);

    expect(await history.read()).toStrictEqual([data2, data1]);
  });

  it("should save no more then 10 items in the history", async () => {
    cities.forEach(async (item) => {
      await history.update(item);
    });
    await history.update(data1);
    await history.update(data2);
    const data = await history.read();

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

  it("should not repeat items in the history", async () => {
    await history.update(data1);
    await history.update(data2);
    await history.update(data1);

    expect(await history.read()).toStrictEqual([data1, data2]);
  });

  it("should delete data from history", async () => {
    await history.update(data1);
    await history.update(data2);
    await history.delete(data1);
    expect(await history.read()).toStrictEqual([data2]);
  });

  it("should clear data from history", async () => {
    await history.update(data1);
    await history.update(data2);
    await history.clear();
    expect(await history.read()).toStrictEqual([]);
  });
});
