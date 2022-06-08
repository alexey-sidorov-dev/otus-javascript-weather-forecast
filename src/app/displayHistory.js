import { History } from "./History";

export function displayHistory() {
  const history = new History();

  return `<span>${JSON.stringify(history.data)}</span>`;
}
