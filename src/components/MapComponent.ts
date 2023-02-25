import { map, tileLayer, Map as LeafletMap, LatLng } from "leaflet";
import { Component } from "./Component";
import { DataError } from "../helpers/DataError";
import { Config } from "../config/Config";
import { MapState } from "../types/component";
import { MapTarget } from "../types/map";

export class MapComponent extends Component<MapState> {
  private instance: LeafletMap;

  protected state: MapState = {} as MapState;

  constructor(container: HTMLElement, initialState?: Partial<MapState>) {
    super(container);

    const { mapInitZoom: initZoom, mapMaxZoom: maxZoom } = new Config();
    this.instance = map(container);
    this.setState({ initZoom, maxZoom, ...initialState });
  }

  protected render(): string {
    return this.templater.template("", this.state);
  }

  setState(patch: Partial<MapState>): void {
    super.setState(patch);

    if (patch.latitude !== undefined && patch.longitude !== undefined) {
      this.displayMap({ latitude: patch.latitude, longitude: patch.longitude });
    }
  }

  private displayMap(data: MapTarget) {
    const latitude = +data.latitude;
    const longitude = +data.longitude;
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
