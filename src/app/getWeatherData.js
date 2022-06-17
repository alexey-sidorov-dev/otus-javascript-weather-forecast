import { isObject } from "lodash";
import { HttpError } from "../utils/HttpError";
import { DataError } from "../utils/DataError";

/**
 * @description Fetch weather data
 * @returns {Promise<any>} Weather data
 */

export async function getWeatherData(params) {
  if (!params || !isObject(params)) {
    throw new DataError("Error in passed params!");
  }

  const key = "a3ec23828a024080b68d50315d06d2f9";
  const units = "M";
  const lang = "ru";
  const url = {
    geo: [
      `https://api.weatherbit.io/v2.0/current?lat=${params.latitude}`,
      `lon=${params.longitude}`,
      `key=${key}`,
      `units=${units}`,
      `lang=${lang}`,
    ].join("&"),
    city: [
      `https://api.weatherbit.io/v2.0/current?city=${params.city}`,
      `key=${key}`,
      `units=${units}`,
      `lang=${lang}`,
    ].join("&"),
  };

  const response = await fetch(url[params.type ?? "city"]);
  if (!response.ok) {
    throw new HttpError("Error in fetching weather data!");
  }

  return response.json();
}
