export type Events = { [event: string]: (ev: Event) => void };

export type Hook = (...args: any[]) => void;

export type Hooks = { [event: string]: Hook[] };

export type ComponentState = Record<string, any>;

export type HistoryState = Pick<AppState, "itemsCount" | "data">;

export type SearchState = Pick<AppState, "infoText" | "infoType">;

export type WeatherState = Pick<
  AppState,
  "description" | "tepmerature" | "humidity" | "icon"
>;
export type MapState = Pick<
  AppState,
  "latitude" | "longitude" | "initZoom" | "maxZoom"
>;

export type AppState = {
  title: string;
  infoText: string;
  infoType: "info" | "error";
  tepmerature: string | number;
  humidity: string | number;
  description: string;
  icon: string;
  itemsCount: number;
  data: Array<string>;
  latitude: string | number;
  longitude: string | number;
  initZoom: number;
  maxZoom: number;
};
