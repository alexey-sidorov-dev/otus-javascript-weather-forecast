import { pull } from "../helpers/utils";
import { IStorage, HistoryData, StorageConfig } from "../types/history";

export class Storage implements IStorage {
  private dataIdentifier: string;

  private itemsCount: number;

  constructor(config: StorageConfig) {
    this.dataIdentifier = config.dataIdentifier;
    this.itemsCount = config.itemsCount;
  }

  read() {
    const historyData = localStorage.getItem(this.dataIdentifier);

    return historyData ? JSON.parse(historyData) : [];
  }

  update(data: HistoryData) {
    const history: HistoryData[] = this.read();

    for (let i = 0; i < history.length; i += 1) {
      if (data.city === history[i].city) {
        history.splice(i, 1);
      }
    }
    history.unshift(data);

    return localStorage.setItem(
      this.dataIdentifier,
      JSON.stringify(history.slice(0, this.itemsCount))
    );
  }

  delete(item: HistoryData) {
    const data: HistoryData[] = this.read();

    for (let i = 0; i < data.length; i += 1) {
      if (item.city === data[i].city) {
        data.splice(i, 1);
      }
    }

    return localStorage.setItem(this.dataIdentifier, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.dataIdentifier);
  }
}
