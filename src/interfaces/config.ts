export interface IConfig {
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
}
