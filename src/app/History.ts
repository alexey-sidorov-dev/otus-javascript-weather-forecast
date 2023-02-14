import { IHistory, IStorage } from "../interfaces/history";
import { Config } from "./Config";
import { Storage } from "./Storage";

export class History implements IHistory {
  private type: string;

  private identifier: string;

  private storage: IStorage;

  constructor(config: Config) {
    this.type = config.historyStorageType;
    this.identifier = config.historyStorageIdentifier;
    this.storage =
      this.type === "localStorage" ? new Storage(config) : new Storage(config);
  }

  async read() {
    return this.storage.read();
  }

  async update(city: string) {
    this.storage.update(city);
  }

  async clear() {
    this.storage.clear();
  }
}
