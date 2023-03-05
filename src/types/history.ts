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
