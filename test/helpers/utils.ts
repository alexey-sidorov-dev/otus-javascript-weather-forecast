import { GenericFunction } from "../../src/types/generic";
import { NoErrorThrownError } from "./NoErrorThrownError";

export async function getError(call: GenericFunction): Promise<unknown> {
  try {
    await call();
    throw new NoErrorThrownError();
  } catch (error) {
    return error;
  }
}
