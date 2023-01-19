import { HttpError } from "../utils/HttpError";

export class Geo {
  constructor(config) {
    this.apiUrl = config.geoApiUrl;
  }

  async getGeo() {
    const url = this.apiUrl;
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpError("The error occurs on getting geolocation");
    }

    return response.json();
  }
}
