import { isObject, isEmpty } from "lodash";

/**
 * Получаем данные погоды по координатам или по городу и стране.
 *
 * @param {Object} params Параметры для запроса погоды
 * @example getWeatherData({ longitude: geoData.longitude, latitude: geoData.latitude, type: "geo"})
 * @example getWeatherData({ city: "Москва", type: "city"})
 * @returns {Promise<any>} Данные с погодой
 */

export async function getWeatherData(params) {
  if (!params || !isObject(params) || isEmpty(params)) {
    throw new Error("Params Error");
  }

  const apiKey = "e3b912ba30d18806e1bee6bd4ca455d0";
  const url = {
    geo:
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${params.latitude}&lon=${params.longitude}&appid=${apiKey}&units=metric&lang=ru`,
    city: `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${apiKey}&units=metric&lang=ru`,
  };

  const response = await fetch(url[params.type ?? "city"]);
  if (response && !response.ok) {
    throw new Error(`HTTP Request Error`);
  }

  return response.json();
}
