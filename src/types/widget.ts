export type GeoData = { city: string };
export type WeatherData = {
  data: [
    {
      weather: { icon: string; description: string };
      temp: string;
      rh: string;
    }
  ];
};
