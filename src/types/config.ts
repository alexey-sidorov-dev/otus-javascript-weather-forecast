export interface IConfig {
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
}
