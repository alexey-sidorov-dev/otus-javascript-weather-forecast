export class Config {
  constructor() {
    this.units = "M";
    this.language = "ru";
    this.geoApiKey = process.env.GEO_API_KEY;
    this.geoApiUrl = process.env.GEO_API_URL;
    this.weatherApiKey = process.env.WEATHER_API_KEY;
    this.weatherApiUrl = process.env.WEATHER_API_URL;
    this.mapContainerId = "map";
    this.mapInitZoom = 10;
    this.mapMaxZoom = 17;
    this.historyStorageType = "localStorage";
    this.historyStorageIdentifier = "weather";
    this.historyItemsCount = 10;
  }
}
