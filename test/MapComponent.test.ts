/* eslint-disable no-new */
import { MapComponent } from "../src/components/MapComponent";
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

  it("should set MapComponent state", () => {
    const newState: Partial<MapState> = {
      latitude: "51.513",
      longitude: "-0.09",
    };
    const map = new MapComponent(element);

    jest.spyOn(map, "setState");
    map.setState(newState);

    expect(map.setState).toHaveBeenCalledTimes(1);
    expect(map.setState).toHaveBeenLastCalledWith({
      latitude: "51.513",
      longitude: "-0.09",
    });
  });
});
