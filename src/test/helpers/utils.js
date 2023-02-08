import { NoErrorThrownError } from "./NoErrorThrownError";

async function getError(call) {
  try {
    await call();
    throw new NoErrorThrownError();
  } catch (error) {
    return error;
  }
}

export { getError };
