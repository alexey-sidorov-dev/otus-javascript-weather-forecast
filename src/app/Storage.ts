import { pull } from "lodash";
import { IStorage } from "../interfaces/history";
import { Config } from "./Config";

export class Storage implements IStorage {
  identifier: string;

  count: number;

  constructor(config: Config) {
    this.identifier = config.historyStorageIdentifier;
    this.count = config.historyItemsCount;
  }

  read() {
    const data = localStorage.getItem(this.identifier);
    return data ? JSON.parse(data) : [];
  }

  update(city: string) {
    const data = this.read();
    pull(data, city);
    data.unshift(city);
    localStorage.setItem(
      this.identifier,
      JSON.stringify(data.slice(0, this.count))
    );
  }

  clear() {
    localStorage.removeItem(this.identifier);
  }
}
