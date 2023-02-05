import { Map } from "../app/Map";
import { Config } from "../app/Config";
import { DataError } from "../app/helpers/DataError";
import { NoErrorThrownError } from "./helpers/NoErrorThrownError";
import { getError } from "./helpers/utils";

describe("Map", () => {
  const config = new Config();
  const map = new Map(config);

  afterEach(() => {
    document.getElementById("map")?.remove();
  });

  it("should throw error with invalid container", async () => {
    const error = await getError(() => {
      map.getInstance();
    });

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(DataError);
  });

  it("should throw error with invalid target", async () => {
    const mapElement = document.createElement("div");
    mapElement.setAttribute("id", "map");
    document.body.append(mapElement);
    const error = await getError(() => {
      map.displayMap({ latitude: 51.513 });
    });

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(DataError);
  });

  it("should throw error with invalid target params", async () => {
    const mapElement = document.createElement("div");
    mapElement.setAttribute("id", "map");
    document.body.append(mapElement);
    const error = await getError(() =>
      map.displayMap({ latitude: 51.513, longitude: "value" })
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(DataError);
  });

  it("should not throw error with correct target params", async () => {
    const mapElement = document.createElement("div");
    mapElement.setAttribute("id", "map");
    document.body.append(mapElement);

    const error = await getError(() =>
      map.displayMap({ latitude: 51.513, longitude: -0.09 })
    );

    expect(error).toBeInstanceOf(NoErrorThrownError);
  });
});
