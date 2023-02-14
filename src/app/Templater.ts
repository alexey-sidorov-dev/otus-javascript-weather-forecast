import { ITemplater } from "../interfaces/templater";
import { Iteration } from "./helpers/Iteration";

export class Templater implements ITemplater {
  public template(input: string, data?: Record<string, unknown>): string {
    return this.templateInternal(input, data);
  }

  private templateInternal(
    input: string,
    data: Record<string, unknown>,
    iterationData?: Iteration
  ): string {
    let result: string = input;

    result = result.replace(
      /{{for (\w+)}}((\s|\S)+){{end for}}/gm,
      (_, collection, internalTemplate) =>
        data[collection] && Array.isArray(data[collection])
          ? (data[collection] as unknown[])
              .map((item: unknown, index: number, arr: RegExpMatchArray) => {
                if (iterationData === undefined) {
                  iterationData = new Iteration(arr.length);
                } else {
                  iterationData.increment();
                }

                return this.templateInternal(
                  internalTemplate,
                  item as Record<string, unknown>,
                  iterationData
                );
              })
              .join("")
          : ""
    );

    result = result.replace(
      /{{loop.index}}/g,
      () => iterationData?.index.toString() ?? ""
    );

    result = result.replace(
      /{{if (\w+)}}((s|\S)+){{end if}}/gm,
      (_, conditionToken: string, innerTemplate) => {
        let rezult = "";

        if (iterationData !== undefined && conditionToken in iterationData) {
          if (iterationData[conditionToken]) {
            rezult = this.templateInternal(innerTemplate, data);
          }
        }

        rezult +=
          conditionToken in data && data[conditionToken] !== undefined
            ? this.templateInternal(innerTemplate, data)
            : "";
        return rezult;
      }
    );

    result = result.replace(/{{(\w+)}}/gm, (_, token) =>
      token in data ? (data[token] as string) : ""
    );

    return result;
  }
}
