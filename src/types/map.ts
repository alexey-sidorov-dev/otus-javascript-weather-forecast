export interface MapTarget {
  latitude: string | number;
  longitude: string | number;
}

export interface MapState extends MapTarget {
  initZoom: number;
  maxZoom: number;
}

export interface IMapComponent {
  setState: (patch: Partial<MapState>) => void;
}
