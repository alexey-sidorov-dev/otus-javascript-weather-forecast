import { MapTarget, WeatherTarget } from "../types/component";
import { WeatherData } from "../types/api";

export function setAttributes(
  element: HTMLElement,
  attributes: Record<string, string> = {}
): void {
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
}

export function normalizeTarget(weatherData: unknown): MapTarget {
  let normalizedTarget = {};

  if (weatherData && typeof weatherData === "object") {
    const {
      data: [
        {
          country_code: country,
          lat: latitude,
          lon: longitude,
          city_name: city,
        },
      ],
    } = <WeatherData>weatherData;

    normalizedTarget = {
      ...normalizedTarget,
      city,
      country,
      longitude,
      latitude,
    };
  }

  return <MapTarget>normalizedTarget;
}

export function normalizeWeather(weatherData: unknown): WeatherTarget {
  let normalizedWeather = {};

  if (weatherData && typeof weatherData === "object") {
    const {
      data: [
        {
          weather: { icon, description },
          temp: temperature,
          rh: humidity,
        },
      ],
    } = <WeatherData>weatherData;

    normalizedWeather = {
      ...normalizedWeather,
      icon,
      description,
      temperature,
      humidity,
    };
  }

  return <WeatherTarget>normalizedWeather;
}

export function makeIdentifier() {
  return (Date.now() * Math.random()).toString(36).substring(0, 5);
}

export function makeDataIdentifier(dataIdentifierPrefix: string) {
  return `${dataIdentifierPrefix}-${makeIdentifier}`;
}
