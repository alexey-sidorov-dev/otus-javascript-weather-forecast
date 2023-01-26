import { escape } from "lodash";
import { setAttributes, getTarget } from "../utils/helpers";

export class Widget {
  constructor(params) {
    this.config = params.config;

    this.map = params.map;
    this.geo = params.geo;
    this.weather = params.weather;
    this.history = params.history;
  }

  async displayInitApp() {
    this.searchContainer = document.getElementById("search");
    this.weatherContainer = document.getElementById("weather");
    this.mapContainer = document.getElementById("map");
    this.historyContainer = document.getElementById("history");

    this.displaySearch();
    this.displayHistory();
  }

  async displayWeather(data) {
    if (!this.weatherContainer) {
      return;
    }

    const target = getTarget(data);
    this.displaySearchInfo(`Погода в городе ${target.city}, ${target.country}`);
    this.weatherContainer.replaceChildren();

    const {
      data: [
        {
          weather: { icon, description },
          temp: tepmerature,
          rh: humidity,
        },
      ],
    } = data;

    if (icon) {
      const weatherImageElement = document.createElement("img");
      setAttributes(weatherImageElement, {
        class: "weather__icon",
        src: `https://www.weatherbit.io/static/img/icons/${icon}.png`,
        alt: "icon",
      });
      this.weatherContainer.appendChild(weatherImageElement);
    }

    const weatherDescriptionElement = document.createElement("span");
    setAttributes(weatherDescriptionElement, {
      class: "weather__description",
    });
    weatherDescriptionElement.appendChild(
      document.createTextNode(
        `${description}, Температура: ${tepmerature}°C, Влажность: ${humidity}%`
      )
    );
    this.weatherContainer.appendChild(weatherDescriptionElement);
  }

  displaySearch() {
    if (!this.searchContainer) {
      return;
    }

    this.input = document.createElement("input");
    setAttributes(this.input, {
      id: "input",
      class: "search__input",
      placeholder: "Город",
      autofocus: true,
    });
    this.input.autofocus = true;

    this.button = document.createElement("button");
    setAttributes(this.button, {
      id: "button",
      class: "search__button",
      type: "button",
    });
    this.button.appendChild(document.createTextNode("Узнать погоду"));

    this.info = document.createElement("div");
    setAttributes(this.info, {
      id: "info",
      class: "search__info search-info",
    });

    this.searchContainer.replaceChildren(this.input, this.button, this.info);

    this.displaySearchInfo("Запрашиваем погоду в вашем городе...");

    this.addSearchListener();
  }

  displaySearchInfo(textContent) {
    if (textContent) {
      const info = document.createElement("span");
      setAttributes(info, {
        class: "search-info__info",
      });
      info.appendChild(document.createTextNode(textContent));

      this.info?.replaceChildren(info);
    }
  }

  displaySearchError(textContent) {
    if (textContent) {
      const error = document.createElement("span");
      setAttributes(error, {
        class: "search-info__error",
      });
      error.appendChild(document.createTextNode(textContent));

      this.info?.replaceChildren(error);
    }
  }

  addSearchListener() {
    this.button.addEventListener("click", async () => {
      if (this.input.value) {
        const escapedValue = escape(this.input.value);
        this.displaySearchInfo(
          `Запрашиваем погоду в городе ${escapedValue}...`
        );

        this.history.update(escapedValue);
        this.displayHistory();

        const weatherData = await this.weather.getWeather({
          city: escapedValue,
        });

        await this.displayWeather(weatherData);
        this.input.value = "";
        this.input.focus();
        await this.displayMap(getTarget(weatherData));
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

  async displayMap(target) {
    if (!this.mapContainer || !target) {
      return;
    }

    this.map.displayMap(target);
  }

  displayHistoryList() {
    const historyList = document.createElement("ul");
    setAttributes(historyList, { class: "history-list" });

    const items = this.history.read();

    items.forEach((textContent) => {
      const item = document.createElement("li");
      setAttributes(item, {
        class: "history-list__item",
      });
      item.appendChild(document.createTextNode(escape(textContent)));

      historyList.appendChild(item);
    });

    this.historyContainer.replaceChildren(historyList);
  }
}
