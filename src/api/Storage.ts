import { pull } from "../helpers/utils";
import { IStorage, IHistoryData, IStorageConfig } from "../types/history";

export class Storage implements IStorage {
  private dataIdentifier: string;

  private itemsCount: number;

  constructor(config: IStorageConfig) {
    this.dataIdentifier = config.dataIdentifier;
    this.itemsCount = config.itemsCount;
  }

  read() {
    const historyData = localStorage.getItem(this.dataIdentifier);
    return historyData ? JSON.parse(historyData) : [];
  }

  update(data: IHistoryData) {
    let historyData = this.read();
    historyData = pull(historyData, data.city);
    historyData.unshift(data.city);
    localStorage.setItem(
      this.dataIdentifier,
      JSON.stringify(historyData.slice(0, this.itemsCount))
    );
  }

  clear() {
    localStorage.removeItem(this.dataIdentifier);
  }
}
