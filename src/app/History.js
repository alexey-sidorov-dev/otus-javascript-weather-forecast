import { pull } from "lodash";

export class History {
  constructor(config) {
    this.identifier = config.historyIdentifier;
    this.count = config.historyCount;
  }

  read() {
    const data = localStorage.getItem(this.identifier);
    return data ? JSON.parse(data) : [];
  }

  update(city) {
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
