export function showErrorPage(element) {
  element.classList.add("error-page");
  element.innerHTML = `
        <h1 >Извините, сервис временно недоступен</h1>
        <img class="sad-cloud" alt=" ">
    `;
}
