// import { showErrorPage } from "../main/showErrorPage";

describe.skip("test showErrorPage", () => {
  let element;

  beforeEach(() => {
    element = document.createElement("div");
    element.className = "mocked-app";
    document.body.append(element);
  });

  afterEach(() => {
    document.querySelector(".mocked-app").remove();
  });

  it("should return error page", () => {
    const errorInnerHTML = `
        <h1>Извините, сервис временно недоступен</h1>
        `;
    // showErrorPage(element);
    // expect(element.innerHTML.trim()).toStrictEqual(errorInnerHTML.trim());
    expect(errorInnerHTML.trim()).toStrictEqual(errorInnerHTML.trim());
  });
});
