import { HttpError } from "../utils/HttpError";

/**
 * @description Fetch user geo data
 * @returns {Object} Geo data
 */
export async function getGeoData() {
  const apiKey = "f8577df470f44c429232a2419bf5dc99";
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new HttpError("Error in fetching user`s geo data!");
  }
  const { city, latitude, longitude } = await response.json();

  return { city, latitude, longitude };
}
