import { ITemplater } from "../interfaces/templater";
import { TemplateDataObject } from "../types/objects";

export class Templater implements ITemplater {
  template(input: string, data: TemplateDataObject = {}): string {
    return this.internalTemplate(input, data);
  }

  /* eslint-disable class-methods-use-this */
  private internalTemplate(input: string, data: TemplateDataObject): string {
    const result = input + data;

    return result;
  }
}
