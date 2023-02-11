import { ITemplater } from "../interfaces/templater";
import { GenericObject, TemplateDataObject } from "../types/objects";

export class Templater<Options = GenericObject> implements ITemplater {
  private options: Options = {} as Options;

  constructor(options?: Options) {
    this.options = options;
  }

  template(input: string, data: TemplateDataObject = {}): string {
    let templated = input;

    templated = templated.replace(
      /\{\{for (\w+)}}(.+?)\{\{endfor\}}/g,
      (match: string, itemsKey: string, subTemplate: string) => {
        let result = "";
        if (itemsKey in data) {
          for (let i = 0; i < data[itemsKey].length; i++) {
            result += this.template(subTemplate, (data[itemsKey] as [])[i]);
          }
        }
        return result;
      }
    );

    return templated;
  }
}
