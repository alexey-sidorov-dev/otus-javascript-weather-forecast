import { Config } from "./Config";

export class Weather {
  apiUrl: Config.apiUrl;

  apiKey: Config.weatherApiKey;

  units: Config.units;

  language: Config.language;

  constructor(config: Config): Weather;

  getWeather: <T extends { city: string }>(
    geo: T
  ) => Promise<
    T extends {
      data: [
        {
          weather: { icon: string; description: string };
          temp: string;
          rh: string;
        }
      ];
    }
      ? T
      : unknown
  >;
}
