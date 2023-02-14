import { Config } from "./Config";

export class Geo {
  constructor(config: Config): Geo;

  getGeo: () => Promise<T extends { city: string } ? T : unknown>;
}
