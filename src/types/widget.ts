export type GeoData = { city: string };
export type WeatherData = {
  data: [
    {
      weather: { icon: string; description: string };
      temp: number;
      rh: number;
      lat: number;
      lon: number;
      city_name: string;
      country_code: string;
    }
  ];
};
