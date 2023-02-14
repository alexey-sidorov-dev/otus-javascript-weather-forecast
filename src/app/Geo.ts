import { Config } from "./Config";
import { HttpError } from "./helpers/HttpError";

export class Geo {
  private apiUrl: string;

  constructor(config: Config) {
    this.apiUrl = `${config.geoApiUrl}?apiKey=${config.geoApiKey}`;
  }

  async getGeo(): Promise<unknown> {
    const url = this.apiUrl;
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpError("Ошибка при запросе текущих координат");
    }

    return response.json();
  }
}
