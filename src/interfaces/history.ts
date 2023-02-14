export interface IHistory {
  read: () => Promise<Array<string> | []>;
  update: (city: string) => Promise<void>;
  clear: () => Promise<void>;
}

export interface IStorage {
  read: () => Array<string> | [];
  update: (city: string) => void;
  clear: () => void;
}
