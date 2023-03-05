import { IHistory, IStorage, HistoryData } from "../types/history";
import { Config } from "../config/Config";
import { Storage } from "./Storage";

export class History implements IHistory {
  private storageType: string;

  private dataIdentifier: string;

  private storage: IStorage;

  private itemsCount: number;

  constructor(config: Config) {
    this.storageType = config.historyStorageType;
    this.dataIdentifier = config.historyDataIdentifier;
    this.itemsCount = config.historyItemsCount;
    this.storage =
      this.storageType === "localStorage"
        ? new Storage({
            dataIdentifier: this.dataIdentifier,
            itemsCount: this.itemsCount,
          })
        : new Storage({
            dataIdentifier: this.dataIdentifier,
            itemsCount: this.itemsCount,
          });
  }

  async read() {
    return this.storage.read();
  }

  async update(data: HistoryData) {
    this.storage.update(data);
  }

  async delete(data: HistoryData) {
    this.storage.delete(data);
  }

  async clear() {
    this.storage.clear();
  }
}
