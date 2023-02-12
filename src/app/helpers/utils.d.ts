import { AttributesObject, GenericObject } from "../../types/objects";

function setAttributes(
  element: HTMLElement,
  attributes: AttributesObject
): void;

function getProperty(
  obj: GenericObject,
  path: string,
  defaultValue?: unknown
): unknown;

export { getProperty, setAttributes };
