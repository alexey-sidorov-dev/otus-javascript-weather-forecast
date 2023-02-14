export class NoErrorThrownError extends Error {
  constructor() {
    super("NoErrorThrownError");
    this.name = "NoErrorThrownError";
  }
}
