export function displaySearch(input) {
  input.innerHTML = `<div class="search_form">
                        <input class="search-form__input" placeholder="Город" required autofocus></input>
                        <button class="search-form__button">Узнать погоду</button>
                      </div>
            `;
}
