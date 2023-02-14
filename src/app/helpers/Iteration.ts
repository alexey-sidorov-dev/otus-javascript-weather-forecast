export class Iteration {
  public index: number;

  public isLast: boolean;

  public isFirst: boolean;

  private bound: number;

  constructor(bound: number) {
    this.bound = bound;
    this.isFirst = true;
    this.isLast = false;
    this.index = 0;
  }

  public increment(): void {
    this.isFirst = false;
    this.index += 1;
    this.isLast = this.bound - 1 === this.index;
  }
}
