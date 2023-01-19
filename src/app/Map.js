import { map, tileLayer, marker, LatLng } from "leaflet";
import { isObject } from "lodash";
import { DataError } from "../utils/DataError";

export class Map {
  constructor(config) {
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

  displayMap(target) {
    if (!target || !isObject(target) || !target.latitude || !target.longitude) {
      throw new DataError("The error occurs on displaying map");
    }

    this.getInstance();
    const latitude = +target.latitude;
    const longitude = +target.longitude;
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

    marker(targetLatLng).addTo(this.map);
  }

  displayWorld(maxZoom) {
    this.getInstance();

    this.map.fitWorld(maxZoom);
  }
}
