function setAttributes(element, attributes = {}) {
  Object.entries(attributes).forEach(([key, value]) =>
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

export { getProperty, setAttributes };
