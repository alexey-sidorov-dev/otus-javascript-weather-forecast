import { NoErrorThrownError } from "./NoErrorThrownError";

export async function getError(call: any): Promise<Error | NoErrorThrownError> {
  try {
    await call();
    throw new NoErrorThrownError();
  } catch (error) {
    return error;
  }
}
