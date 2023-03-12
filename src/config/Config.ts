import { IConfig } from "../types/config";

export class Config implements IConfig {
  units: string;

  language: string;

  geoApiKey: string;

  geoApiUrl: string;

  weatherApiKey: string;

  weatherApiUrl: string;

  mapInitZoom: number;

  mapMaxZoom: number;

  historyStorageType: string;

  historyDataIdentifierPrefix: string;

  historyItemsCount: number;

  searchContainerId: string;

  infoContainerId: string;

  weatherContainerId: string;

  mapContainerId: string;

  historyContainerId: string;

  constructor() {
    this.units = "M";
    this.language = "ru";
    this.geoApiKey = String(process.env.GEO_API_KEY);
    this.geoApiUrl = String(process.env.GEO_API_URL);
    this.weatherApiKey = String(process.env.WEATHER_API_KEY);
    this.weatherApiUrl = String(process.env.WEATHER_API_URL);
    this.mapInitZoom = 10;
    this.mapMaxZoom = 17;
    this.historyStorageType = String(process.env.HISTORY_STORAGE_TYPE);
    this.historyItemsCount = 10;
    this.historyDataIdentifierPrefix = "weather";
    this.searchContainerId = "search";
    this.infoContainerId = "info";
    this.weatherContainerId = "weather";
    this.mapContainerId = "map";
    this.historyContainerId = "history";
  }
}
