import { isObject } from "lodash";
import { NoErrorThrownError } from "./NoErrorThrownError";

async function getError(call) {
  try {
    await call();
    throw new NoErrorThrownError();
  } catch (error) {
    return error;
  }
}

function setAttributes(element, attrs = {}) {
  Object.entries(attrs).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
}

function getProperty(obj, path, defaultValue = undefined) {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

function getTarget(data) {
  if (!data || !isObject(data)) {
    return {};
  }

  return {
    city: getProperty(data, "data[0].city_name"),
    country: getProperty(data, "data[0].country_code"),
    latitude: getProperty(data, "data[0].lat"),
    longitude: getProperty(data, "data[0].lon"),
  };
}

export { getError, getProperty, getTarget, setAttributes };
