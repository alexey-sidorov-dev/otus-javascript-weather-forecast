import { Templater } from "../src/components/Templater";

describe("Templater", () => {
  it("should be a Templater class", () => {
    expect(Templater).toBeInstanceOf(Function);
    expect(new Templater()).toBeInstanceOf(Templater);
  });

  it("should replace placeholders", () => {
    const data: { NAME: string } = {
      NAME: `${Math.random()}`,
    };
    const generator = new Templater();

    expect(generator.template("Name is {{NAME}}", data)).toBe(
      `Name is ${data.NAME}`
    );
    expect(generator.template("Name is {{NAME}}")).toBe(`Name is `);
    expect(generator.template("Name is {{NAME}} {{SURNAME}}~", data)).toBe(
      `Name is ${data.NAME} ~`
    );
    expect(generator.template("Name is {{NAME}}. Your {{NAME}}", data)).toBe(
      `Name is ${data.NAME}. Your ${data.NAME}`
    );
  });

  it("should replace placeholders in multiline", () => {
    const data: { NAME: string } = {
      NAME: `${Math.random()}`,
    };
    const generator = new Templater();

    expect(
      generator.template(
        "Name is {{NAME}} \n simple text \n replace it {{NAME}}",
        data
      )
    ).toBe(`Name is ${data.NAME} \n simple text \n replace it ${data.NAME}`);
  });

  it("should replace placeholders in for of directive", () => {
    const data: { NAME: string; items: { item: number }[] } = {
      NAME: `${Math.random()}`,
      items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }],
    };
    const generator = new Templater();

    expect(
      generator.template(
        "Name is {{NAME}}. Number is {{for items}}{{item}}{{end for}}",
        data
      )
    ).toBe(`Name is ${data.NAME}. Number is 1234`);
    expect(
      generator.template(
        "Name is {{NAME}}. Number is {{for props}}{{prop}}{{end for}}",
        data
      )
    ).toBe(`Name is ${data.NAME}. Number is `);
  });

  it("should replace placeholders in if condition", () => {
    const data: { NAME: string; items: { item: number }[] } = {
      NAME: `${Math.random()}`,
      items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }],
    };
    const generator = new Templater();

    expect(
      generator.template("{{if NAME}}<h3>{{NAME}}</h3>{{end if}}", data)
    ).toBe(`<h3>${data.NAME}</h3>`);
  });

  it("should replace placeholders for isFirst and isLast conditions", () => {
    const data: { NAME: string; items: { item: number }[] } = {
      NAME: `${Math.random()}`,
      items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }],
    };
    const generator = new Templater();

    expect(
      generator.template(
        "Name is {{NAME}}. Number is {{for items}}" +
          "{{if isFirst}}[{{end if}}{{item}}{{if isLast}}]{{end if}}{{end for}}",
        data
      )
    ).toBe(`Name is ${data.NAME}. Number is [1234]`);
  });

  it("should replace placeholders for index", () => {
    const data: { NAME: string; items: { item: number }[] } = {
      NAME: `${Math.random()}`,
      items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }],
    };
    const generator = new Templater();

    expect(
      generator.template(
        "Name is {{NAME}}. Number is {{for items}}" +
          "{{loop.index}} {{item}}\n{{end for}}",
        data
      )
    ).toBe(`Name is ${data.NAME}. Number is 0 1\n1 2\n2 3\n3 4\n`);
  });
});
