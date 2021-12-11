export function showErrorPage(element) {
  element.innerHTML = `
        <h1>Извините, сервис временно недоступен, попробуйте повторить попытку позднее</h1>
    `;
}
