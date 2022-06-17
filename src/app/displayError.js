export function displayError(element) {
  element.classList.add("error");
  element.innerHTML = `
        <img class="sad-cloud" alt=":(">
    `;
}
