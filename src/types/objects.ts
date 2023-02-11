type EpmtyObject = { [key: string]: never };
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type GenericObject = { [key: string]: any };
type AttributesObject = { [key: string]: string };
type TemplateDataObject = { [key: string]: string | [] };

export { EpmtyObject, GenericObject, AttributesObject, TemplateDataObject };
