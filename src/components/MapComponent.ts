import { map, tileLayer, Map as LeafletMap, LatLng } from "leaflet";
import { DataError } from "../helpers/DataError";
import { Config } from "../config/Config";
import { MapState, MapTarget, IMapComponent } from "../types/map";
import { Events } from "../types/component";

export class MapComponent implements IMapComponent {
  protected instance: LeafletMap;

  protected state: MapState = <MapState>{};

  protected element: HTMLElement;

  protected events: Events = <Events>{};

  constructor(element: HTMLElement, initialState?: Partial<MapState>) {
    this.element = element;
    const { mapInitZoom: initZoom, mapMaxZoom: maxZoom } = new Config();
    this.instance = map(element);
    this.setState({ initZoom, maxZoom, ...initialState });
  }

  setState(patch: Partial<MapState>): void {
    this.state = { ...this.state, ...patch };

    if (this.state.latitude && this.state.longitude) {
      this.displayMap(this.state);
    }
  }

  private displayMap(target: MapTarget) {
    const latitude = +target.latitude;
    const longitude = +target.longitude;
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      throw new DataError("The error occurs on displaying map");
    }

    const targetLatLng = new LatLng(latitude, longitude);
    this.instance.setView(targetLatLng, this.state.initZoom);

    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: this.state.maxZoom,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.instance);

    document.querySelector(".leaflet-bottom svg")?.remove();
  }
}
