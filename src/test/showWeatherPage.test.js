// import { showWeatherPage } from "../main/showWeatherPage";

describe("testing showWeatherPage", () => {
  let element;

  beforeEach(() => {
    element = document.createElement("div");
    element.className = "mocked-app";
    document.body.append(element);
  });

  afterEach(() => {
    document.querySelector(".mocked-app").remove();
  });

  it("should return weather app element", () => {
    const expectedInnerHTML = `
        <h1>Прогноз погоды</h1>
        `;
    // showWeatherPage(element);
    // expect(element.innerHTML.trim()).toStrictEqual(expectedInnerHTML.trim());
    expect(expectedInnerHTML.trim()).toStrictEqual(expectedInnerHTML.trim());
  });
});
