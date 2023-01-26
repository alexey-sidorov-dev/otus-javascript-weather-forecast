export class Config {
  constructor() {
    this.units = "M";
    this.language = "ru";
    this.geoApiKey = "f8577df470f44c429232a2419bf5dc99";
    this.geoApiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${this.geoApiKey}`;
    this.weatherApiKey = "a3ec23828a024080b68d50315d06d2f9";
    this.weatherApiUrl = `https://api.weatherbit.io/v2.0/current`;
    this.mapContainerId = "map";
    this.mapInitZoom = 10;
    this.mapMaxZoom = 17;
    this.historyIdentifier = "weather";
    this.historyCount = 10;
  }
}
