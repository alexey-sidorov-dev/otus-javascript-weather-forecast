import { History } from "./History";

export function displayHistory(element) {
  const history = new History();
  element.innerHTML = `<span>История поиска: ${JSON.stringify(
    history.data
  )}</span>`;
}
