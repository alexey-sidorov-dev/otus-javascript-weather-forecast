import isArray from "lodash/isArray";
import without from "lodash/without";

export class History {
  constructor() {
    const data = JSON.parse(window.localStorage.getItem("history"));
    this.data = data && isArray(data) ? data : [];
    console.log(this.data);
  }

  addItem(item) {
    this.data = this.data.push(item);
    window.localStorage.setItem("history", JSON.stringify(this.data));
  }

  deleteItem(item) {
    this.data = without(this.data, item);
    window.localStorage.setItem("history", JSON.stringify(this.data));
  }

  clearAll() {
    this.data = [];
    window.localStorage.removeItem("history");
  }
}
