import { HistoryData } from "./api";
import { GenericObject } from "./generic";

export type Events = { [event: string]: (ev: Event) => void };

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Listener = (...args: any[]) => void;

export type Listeners = { [event: string]: Listener[] };

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ComponentState = Record<string, any>;

export type AppState = GenericObject;

export type SearchState = GenericObject;

export type InfoState = Pick<WidgetState, "infoText" | "infoType">;

export type WeatherState = Pick<
  WidgetState,
  "description" | "temperature" | "humidity" | "icon"
>;

export type WeatherTarget = Pick<
  WidgetState,
  "description" | "temperature" | "humidity" | "icon"
>;

export type MapState = Pick<
  WidgetState,
  "latitude" | "longitude" | "initZoom" | "maxZoom" | "city" | "country"
>;

export type MapTarget = Pick<
  WidgetState,
  "latitude" | "longitude" | "city" | "country"
>;

export type HistoryState = Pick<WidgetState, "itemsCount" | "data">;

export type WidgetState = {
  infoText: string;
  infoType: "info" | "error";
  temperature: string | number;
  humidity: string | number;
  description: string;
  icon: string;
  itemsCount: number;
  data: Array<HistoryData>;
  city: string;
  country: string;
  latitude: string | number;
  longitude: string | number;
  initZoom: number;
  maxZoom: number;
};

export interface IMapComponent {
  setState: (patch: Partial<MapState>) => void;
}
