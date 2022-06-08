export class NoErrorThrownError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoErrorThrownError";
  }
}
