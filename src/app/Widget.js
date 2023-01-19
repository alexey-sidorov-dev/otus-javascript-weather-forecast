import { get, isObject } from "lodash";

const Helpers = {
  setAttributes: (element, attrs = {}) => {
    Object.entries(attrs).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
  },
};

export class Widget {
  constructor(params) {
    this.config = params.config;

    this.map = params.map;
    this.geo = params.geo;
    this.weather = params.weather;
    this.history = params.history;

    this.target = {};
  }

  async displayInitApp() {
    this.searchContainer = document.getElementById("search");
    this.weatherContainer = document.getElementById("weather");
    this.mapContainer = document.getElementById("map");
    this.historyContainer = document.getElementById("history");

    this.displaySearch();
    this.displayHistory();
  }

  setTarget(data) {
    if (!data || !isObject(data)) {
      this.target = {};
    }

    this.target = {
      latitude: get(data, "data[0].lat"),
      longitude: get(data, "data[0].lon"),
    };
  }

  async displayWeather(data) {
    if (!this.weatherContainer) {
      return;
    }

    this.info?.replaceChildren();
    this.weatherContainer.replaceChildren();

    const {
      data: [
        {
          weather: { icon, description },
          city_name: city,
          temp: tepmerature,
          rh: humidity,
          country_code: country,
        },
      ],
    } = data;

    const weatherDataElement = document.createElement("span");
    Helpers.setAttributes(weatherDataElement, {
      class: "weather__data",
    });
    weatherDataElement.appendChild(
      document.createTextNode(
        // FIXME: get city from event
        `${city}, ${country}, T: ${tepmerature}°C, RH: ${humidity}%`
      )
    );
    this.weatherContainer.appendChild(weatherDataElement);

    if (icon) {
      const weaterImageElement = document.createElement("img");
      Helpers.setAttributes(weaterImageElement, {
        class: "weather__icon",
        src: `https://www.weatherbit.io/static/img/icons/${icon}.png`,
        alt: "icon",
      });
      this.weatherContainer.appendChild(weaterImageElement);
    }

    const weatherDescriptionElement = document.createElement("span");
    Helpers.setAttributes(weatherDataElement, {
      class: "weather__description",
    });
    weatherDescriptionElement.appendChild(
      document.createTextNode(`${description}`)
    );
    this.weatherContainer.appendChild(weatherDescriptionElement);
  }

  displaySearchInfo(textContent) {
    if (textContent) {
      const info = document.createElement("span");
      Helpers.setAttributes(info, {
        class: "search-info__info",
      });
      info.appendChild(document.createTextNode(textContent));

      this.info?.replaceChildren(info);
    }
  }

  displaySearchError(textContent) {
    if (textContent) {
      const error = document.createElement("span");
      Helpers.setAttributes(error, {
        class: "search-info__error",
      });
      error.appendChild(document.createTextNode(textContent));

      this.info?.replaceChildren(error);
    }
  }

  displaySearch() {
    if (!this.searchContainer) {
      return;
    }

    this.input = document.createElement("input");
    Helpers.setAttributes(this.input, {
      id: "input",
      class: "search__input",
      placeholder: "Город",
      autofocus: true,
    });
    this.input.autofocus = true;

    this.button = document.createElement("button");
    Helpers.setAttributes(this.button, {
      id: "button",
      class: "search__button",
      type: "button",
    });
    this.button.appendChild(document.createTextNode("Узнать погоду"));

    this.info = document.createElement("div");
    Helpers.setAttributes(this.info, {
      id: "info",
      class: "search__info search-info",
    });

    this.searchContainer.replaceChildren(this.input, this.button, this.info);

    this.displaySearchInfo("Запрашиваем погоду в вашем городе");

    this.addSearchListener();
  }

  addSearchListener() {
    this.button.addEventListener("click", async () => {
      if (this.input.value) {
        console.log(this.input.value);
        this.displaySearchInfo(
          `Запрашиваем погоду в городе ${this.input.value}`
        );
        // FIXME:
        this.weatherContainer.replaceChildren();
        // FIXME:
        // this.map.displayWorld();

        this.history.update(this.input.value);
        this.displayHistory();

        const weatherData = await this.weather.getWeather({
          city: this.input.value,
        });

        this.setTarget(weatherData);
        await this.displayWeather(weatherData);
        this.input.value = "";
        this.input.focus();
        // FIXME: исправить разметку отображения карты на текущий target
        // await this.displayMap();
      }
    });

    this.input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.button.click();
      }
    });
  }

  displayHistory() {
    if (this.historyContainer) {
      this.displayHistoryList();
      this.addHistoryListener();
    }
  }

  addHistoryListener() {
    const items = document.querySelectorAll("#history ul li");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        this.input.value = item.textContent;
        this.button.click();
      });
    });
  }

  /*
   FIXME: исправить разметку при отображении карты
  async displayMap(target) {
    if (!this.mapContainer) {
      return;
    }

    this.map.displayMap(target || this.target);
  }
  */

  displayHistoryList() {
    const historyList = document.createElement("ul");
    Helpers.setAttributes(historyList, { class: "history-list" });

    const items = this.history.read();

    items.forEach((textContent) => {
      const item = document.createElement("li");
      Helpers.setAttributes(item, {
        class: "history-list__item",
      });
      item.appendChild(document.createTextNode(textContent));

      historyList.appendChild(item);
    });

    this.historyContainer.replaceChildren(historyList);
  }
}
