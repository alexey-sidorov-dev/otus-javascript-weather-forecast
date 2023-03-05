import { MapState } from "./component";

export type MapTarget = {
  latitude: string | number;
  longitude: string | number;
  city: string;
  country: string;
};

export interface IMapComponent {
  setState: (patch: Partial<MapState>) => void;
}
