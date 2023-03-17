/* eslint-disable no-new */
import { InfoComponent } from "../src/components/InfoComponent";
import { InfoState } from "../src/types/component";

describe("InfoComponent", () => {
  let root: HTMLDivElement;
  let element: HTMLDivElement;

  beforeAll(() => {
    root = document.createElement("div");
    root.setAttribute("id", "app");
    document.body.append(root);
  });

  beforeEach(() => {
    element = document.createElement("div");
    root.append(element);
  });

  afterEach(() => {
    root.replaceChildren();
  });

  afterAll(() => {
    document.body.replaceChildren();
  });

  it("should be a class", () => {
    const info = new InfoComponent(element);

    expect(InfoComponent).toBeInstanceOf(Function);
    expect(info).toBeInstanceOf(InfoComponent);
  });

  it("should initialize InfoComponent without initial state", () => {
    new InfoComponent(element);

    expect(element.innerHTML).toBe(`<span class="info__info"></span>`);
  });

  it("should initialize InfoComponent state with initial state", () => {
    new InfoComponent(element, {
      infoText: "Info",
    });

    expect(element.innerHTML).toBe(`<span class="info__info">Info</span>`);
  });

  it("should set InfoComponent state", () => {
    const defaultState: InfoState = {
      infoType: "info",
      infoText: "Запрашиваем погоду в вашем городе...",
    };

    const info = new InfoComponent(element, defaultState);

    jest.spyOn(info, "setState");
    info.setState({
      infoType: "error",
      infoText: "Error",
    });

    expect(info.setState).toHaveBeenCalledTimes(1);
    expect(info.setState).toHaveBeenLastCalledWith({
      ...{
        infoType: "error",
        infoText: "Error",
      },
    });
    expect(element.innerHTML).toBe(`<span class="info__error">Error</span>`);
  });

  it("should update InfoComponent state", () => {
    const infoText = String(Math.round(Math.random() * 100));
    const infoType = "info";

    const info = new InfoComponent(element);

    jest.spyOn(info, "setState");
    info.updateState({ infoText, infoType });

    expect(info.setState).toHaveBeenCalledTimes(1);
    expect(info.setState).toHaveBeenCalledWith({ infoText, infoType });
  });
});
