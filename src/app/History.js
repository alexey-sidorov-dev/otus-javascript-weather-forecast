import { Storage } from "./Storage";

export class History {
  constructor(config) {
    this.type = config.historyStorageType;
    this.identifier = config.historyStorageIdentifier;
    this.storage = new Storage(config);
  }

  async read() {
    return this.storage.read();
  }

  async update(city) {
    return this.storage.update(city);
  }

  async clear() {
    return this.storage.clear(this.identifier);
  }
}
