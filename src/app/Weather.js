import { isObject } from "lodash";
import { HttpError } from "../utils/HttpError";
import { DataError } from "../utils/DataError";

export class Weather {
  constructor(config) {
    this.apiUrl = config.weatherApiUrl;
    this.apiKey = config.weatherApiKey;
    this.units = config.units;
    this.language = config.language;
  }

  async getWeather(geo) {
    if (!geo || !isObject(geo) || !geo.city) {
      throw new DataError("The error occurs on getting weather");
    }

    const url = `${this.apiUrl}?key=${this.apiKey}&units=${this.units}&lang=${this.language}&city=${geo.city}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpError("The error occurs on getting weather");
    }

    return response.json();
  }
}
