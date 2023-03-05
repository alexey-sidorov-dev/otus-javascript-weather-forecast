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
