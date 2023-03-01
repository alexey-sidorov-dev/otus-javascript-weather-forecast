import { MapTarget } from "./map";

export type Events = Record<string, (ev: Event) => void>;

export type ComponentState = Record<string, unknown>;

export interface HistoryState {
  itemsCount: number;
  data: Array<string>;
}

export interface SearchState {
  infoText: string;
  infoType: "info" | "error";
}

export interface WeatherState {
  description: string;
  tepmerature: string | number;
  humidity: string | number;
  icon: string;
}

export interface AppState {
  title: string;
}
