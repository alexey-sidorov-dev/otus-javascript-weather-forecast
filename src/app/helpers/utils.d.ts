function setAttributes(
  element: HTMLElement,
  attributes: Record<string, string>
): void;

function getProperty(
  obj: unknown,
  path: string,
  defaultValue?: unknown
): unknown;

export { getProperty, setAttributes };
