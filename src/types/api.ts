export type GeoData = {
  city: string;
};

export type WeatherData = {
  data: [
    {
      weather: { code: number; icon: string; description: string };
      app_temp: number;
      temp: number;
      rh: number;
      lat: number;
      lon: number;
      city_name: string;
      country_code: string;
    }
  ];
};

export type HistoryData = {
  city: string;
};

export type StorageConfig = {
  dataIdentifier: string;
  itemsCount: number;
};

export interface IHistory {
  read: () => Promise<Array<HistoryData> | []>;
  update: (data: HistoryData) => Promise<void>;
  delete: (data: HistoryData) => Promise<void>;
  clear: () => Promise<void>;
}

export interface IStorage {
  read: () => Array<HistoryData> | [];
  update: (data: HistoryData) => void;
  delete: (data: HistoryData) => void;
  clear: () => void;
}
