import { NoErrorThrownError } from "./NoErrorThrownError";

export function getError<F>(call: F): Promise<Error | NoErrorThrownError>;
