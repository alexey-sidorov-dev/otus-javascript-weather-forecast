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
