import { map, tileLayer, LatLng } from "leaflet";
import { isObject } from "lodash";
import { Config } from "./Config";
import { DataError } from "./helpers/DataError";

export class Map {
  initZoom: number;

  maxZoom: number;

  container: string;

  map: any;

  constructor(config: Config) {
    this.initZoom = config.mapInitZoom;
    this.maxZoom = config.mapMaxZoom;
    this.container = config.mapContainerId;
  }

  getInstance() {
    const mapElement = document.getElementById(this.container);

    if (!mapElement) {
      throw new DataError("Map container not found");
    }

    this.map = this.map || map(mapElement);
  }

  displayMap(data: { latitude: string; longitude: string }) {
    if (!data || !isObject(data) || !data.latitude || !data.longitude) {
      throw new DataError("The error occurs on displaying map");
    }

    this.getInstance();
    const latitude = +data.latitude;
    const longitude = +data.longitude;
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      throw new DataError("The error occurs on displaying map");
    }

    const targetLatLng = new LatLng(latitude, longitude);
    this.map.setView(targetLatLng, this.initZoom);

    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: this.maxZoom,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    document.querySelector(".leaflet-bottom svg")?.remove();
  }
}
