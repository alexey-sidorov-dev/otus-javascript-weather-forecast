import { NoErrorThrownError } from "./NoErrorThrownError";

export async function getError(call) {
  try {
    await call();
    throw new NoErrorThrownError();
  } catch (error) {
    return error;
  }
}
