import { HttpError } from "./helpers/HttpError";

export class Geo {
  constructor(config) {
    this.apiUrl = `${config.geoApiUrl}?apiKey=${config.geoApiKey}`;
  }

  async getGeo() {
    const url = this.apiUrl;
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpError("Ошибка при запросе текущих координат");
    }

    return response.json();
  }
}
