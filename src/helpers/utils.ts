import { Config } from "../config/Config";
import { GenericObject } from "../types/generic";
import { IWeatherData } from "../types/weather";

export function setAttributes(
  element: HTMLElement,
  attributes: Record<string, string> = {}
): void {
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
}

export function getProperty(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: unknown
): unknown {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res: unknown, key: string) =>
          res !== null && res !== undefined && typeof res === "object"
            ? (res as Record<string, unknown>)[key]
            : res,
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

export function pull<T>(sourceArray: T[], ...removeList: T[]): T[] {
  const removeSet = new Set(removeList);

  return sourceArray.filter((el) => !removeSet.has(el));
}

export function normalizeTarget(targetData: unknown) {
  let normalizedTarget = {};

  if (
    targetData &&
    typeof targetData === "object" &&
    new Config().geoApiUrl.includes("ipgeolocation.io")
  ) {
    normalizedTarget = {
      ...normalizedTarget,
      city: getProperty(<GenericObject>targetData, "data[0].city_name"),
      country: getProperty(<GenericObject>targetData, "data[0].country_code"),
      latitude: getProperty(<GenericObject>targetData, "data[0].lat"),
      longitude: getProperty(<GenericObject>targetData, "data[0].lon"),
    };
  }

  return normalizedTarget;
}

export function normalizeWeather(weatherData: unknown) {
  let normalizedWeather = {};

  if (new Config().weatherApiUrl.includes("weatherbit.io")) {
    const {
      data: [
        {
          weather: { icon, description },
          temp: temperature,
          rh: humidity,
        },
      ],
    } = <IWeatherData>weatherData;
    normalizedWeather = {
      ...normalizedWeather,
      icon,
      description,
      temperature,
      humidity,
    };
  }

  return normalizedWeather;
}
