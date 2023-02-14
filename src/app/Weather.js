import { HttpError } from "./helpers/HttpError";
import { DataError } from "./helpers/DataError";

export class Weather {
  constructor(config) {
    this.apiUrl = config.weatherApiUrl;
    this.apiKey = config.weatherApiKey;
    this.units = config.units;
    this.language = config.language;
  }

  async getWeather(geo) {
    if (!geo || typeof geo !== "object" || !geo.city) {
      throw new DataError(
        `При запросе погоды в городе ${geo.city} произошла ошибка`
      );
    }

    const url = `${this.apiUrl}?key=${this.apiKey}&units=${this.units}&lang=${this.language}&city=${geo.city}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpError(
        `При запросе погоды в городе ${geo.city} произошла ошибка`
      );
    }

    if (response.status === 204) {
      throw new HttpError(`Не найдены данные о погоде в городе ${geo.city}`);
    }

    return response.json();
  }
}
