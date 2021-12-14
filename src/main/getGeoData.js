/**
 * Получаем данные по текущему пользователя для последующего отображения погоды при входе на сайт
 *
 * @returns {Promise<any>}  Геоданные текущего пользователя
 */

export async function getGeoData() {
  const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
  if (response && !response.ok) {
    throw new Error(`HTTP Request Error`);
  }

  return response.json();
}
