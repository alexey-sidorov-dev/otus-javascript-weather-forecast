export interface IHistory {
  read: () => Promise<Array<string> | []>;
  update: (data: IHistoryData) => Promise<void>;
  clear: () => Promise<void>;
}

export interface IHistoryData {
  city: string;
}
export interface IStorage {
  read: () => Array<string> | [];
  update: (data: IHistoryData) => void;
  clear: () => void;
}

export interface IStorageConfig {
  dataIdentifier: string;
  itemsCount: number;
}
