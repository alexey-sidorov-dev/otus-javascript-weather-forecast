import { escape, isObject } from "lodash";
import { IHistory } from "../interfaces/history";
import { WeatherData } from "../types/widget";
import { Config } from "./Config";
import { setAttributes, getProperty } from "./helpers/utils";

export class Widget {
  config: Config;

  map: any;

  geo: any;

  weather: any;

  history: IHistory;

  searchContainer: HTMLElement;

  weatherContainer: HTMLElement;

  mapContainer: HTMLElement;

  historyContainer: HTMLElement;

  input: HTMLInputElement;

  button: HTMLButtonElement;

  info: HTMLDivElement;

  constructor(params: Record<string, any>) {
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

  async displayWeather(weatherData: WeatherData) {
    if (!this.weatherContainer) {
      return;
    }

    const target: Record<string, any> = this.getNormalizedTarget(weatherData);
    this.displaySearchInfo(`Погода в городе ${target.city}, ${target.country}`);
    this.weatherContainer.replaceChildren();

    const weather: any = this.getNormalizedWeather(weatherData as WeatherData);
    if (weather.icon) {
      const weatherImageElement = document.createElement("img");
      setAttributes(weatherImageElement, {
        class: "weather__icon",
        src: `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`,
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
        `${weather.description}, Температура: ${weather.tepmerature}°C, Влажность: ${weather.humidity}%`
      )
    );
    this.weatherContainer.appendChild(weatherDescriptionElement);
  }

  displaySearch() {
    if (!this.searchContainer) {
      return;
    }

    this.input = document.createElement("input") as HTMLInputElement;
    setAttributes(this.input, {
      id: "input",
      class: "search__input",
      placeholder: "Город",
      autofocus: "true",
    });
    this.input.autofocus = true;

    this.button = document.createElement("button") as HTMLButtonElement;
    setAttributes(this.button, {
      id: "button",
      class: "search__button",
      type: "button",
    });
    this.button.appendChild(document.createTextNode("Узнать погоду"));

    this.info = document.createElement("div") as HTMLDivElement;
    setAttributes(this.info, {
      id: "info",
      class: "search__info search-info",
    });

    this.searchContainer.replaceChildren(this.input, this.button, this.info);

    this.displaySearchInfo("Запрашиваем погоду в вашем городе...");

    this.addSearchListener();
  }

  displaySearchInfo(textContent: string) {
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

        try {
          const weatherData = await this.weather.getWeather({
            city: escapedValue,
          });

          await this.displayWeather(weatherData);

          await this.history.update(escapedValue);
          await this.displayHistory();
          this.input.value = "";
          this.input.focus();
          await this.displayMap(this.getNormalizedTarget(weatherData));
        } catch (e) {
          this.displaySearchError(
            e.message || "При запросе погоды произошла ошибка"
          );
        }
      }
    });

    this.input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.button.click();
      }
    });
  }

  async displayHistory() {
    if (this.historyContainer) {
      await this.displayHistoryList();
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

  async displayHistoryList() {
    const historyList = document.createElement("ul");
    setAttributes(historyList, { class: "history-list" });

    const items = await this.history.read();

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

  getNormalizedTarget(targetData: any) {
    let normalizedTarget = {};

    if (
      targetData &&
      isObject(targetData) &&
      this.config.geoApiUrl.includes("ipgeolocation.io")
    ) {
      normalizedTarget = {
        ...normalizedTarget,
        city: getProperty(
          targetData as Record<string, any>,
          "data[0].city_name"
        ),
        country: getProperty(
          targetData as Record<string, any>,
          "data[0].country_code"
        ),
        latitude: getProperty(targetData as Record<string, any>, "data[0].lat"),
        longitude: getProperty(
          targetData as Record<string, any>,
          "data[0].lon"
        ),
      };
    }

    return normalizedTarget;
  }

  getNormalizedWeather(weatherData: any) {
    let normalizedWeather = {};

    if (this.config.weatherApiUrl.includes("weatherbit.io")) {
      const {
        data: [
          {
            weather: { icon, description },
            temp: tepmerature,
            rh: humidity,
          },
        ],
      } = weatherData;
      normalizedWeather = {
        ...normalizedWeather,
        icon,
        description,
        tepmerature,
        humidity,
      };
    }

    return normalizedWeather;
  }
}
