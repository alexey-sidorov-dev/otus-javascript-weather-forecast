/* eslint-disable no-new */
import { MapComponent } from "../src/components/MapComponent";
import { Config } from "../src/config/Config";
import { MapState } from "../src/types/component";

describe("MapComponent", () => {
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
    const map = new MapComponent(element);

    expect(MapComponent).toBeInstanceOf(Function);
    expect(map).toBeInstanceOf(MapComponent);
  });

  it("should initialize MapComponent without initial state", () => {
    const { mapInitZoom: initZoom, mapMaxZoom: maxZoom } = new Config();
    const setStateSpy = jest.spyOn(MapComponent.prototype, "setState");
    new MapComponent(element);

    expect(setStateSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).toHaveBeenLastCalledWith({ initZoom, maxZoom });
  });

  it("should initialize MapComponent state with initial state", () => {
    const { mapInitZoom: initZoom, mapMaxZoom: maxZoom } = new Config();
    const setStateSpy = jest.spyOn(MapComponent.prototype, "setState");
    new MapComponent(element, {
      latitude: "51.513",
      longitude: "-0.09",
    });

    expect(setStateSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).toHaveBeenLastCalledWith({
      initZoom,
      maxZoom,
      ...{
        latitude: "51.513",
        longitude: "-0.09",
      },
    });
  });

  it("should set MapComponent state", () => {
    const { mapInitZoom: initZoom, mapMaxZoom: maxZoom } = new Config();
    const newState: Partial<MapState> = {
      latitude: "51.513",
      longitude: "-0.09",
    };
    const setStateSpy = jest.spyOn(MapComponent.prototype, "setState");
    const map = new MapComponent(element);

    expect(setStateSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).toHaveBeenLastCalledWith({ initZoom, maxZoom });

    jest.spyOn(map, "setState");
    map.setState(newState);

    expect(map.setState).toHaveBeenCalledTimes(2);
    expect(map.setState).toHaveBeenLastCalledWith({
      latitude: "51.513",
      longitude: "-0.09",
    });
  });
});
