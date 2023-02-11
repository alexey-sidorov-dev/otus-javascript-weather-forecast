import { TemplateDataObject } from "../types/objects";

export interface ITemplater {
  template: (input: string, data?: TemplateDataObject) => string;
}
