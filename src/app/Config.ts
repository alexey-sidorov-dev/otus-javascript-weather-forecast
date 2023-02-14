import { IConfig } from "../interfaces/config";

export class Config implements IConfig {
  units: string;

  language: string;

  geoApiKey: string;

  geoApiUrl: string;

  weatherApiKey: string;

  weatherApiUrl: string;

  mapContainerId: string;

  mapInitZoom: number;

  mapMaxZoom: number;

  historyStorageType: string;

  historyStorageIdentifier: string;

  historyItemsCount: number;

  constructor() {
    this.units = "M";
    this.language = "ru";
    this.geoApiKey = String(process.env.GEO_API_KEY);
    this.geoApiUrl = String(process.env.GEO_API_URL);
    this.weatherApiKey = String(process.env.WEATHER_API_KEY);
    this.weatherApiUrl = String(process.env.WEATHER_API_URL);
    this.mapContainerId = "map";
    this.mapInitZoom = 10;
    this.mapMaxZoom = 17;
    this.historyStorageType = "localStorage";
    this.historyStorageIdentifier = "weather";
    this.historyItemsCount = 10;
  }
}
