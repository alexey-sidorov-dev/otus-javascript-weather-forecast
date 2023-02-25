import { ITemplaterIteration } from "../types/templater";

export class TemplaterIteration implements ITemplaterIteration {
  index: number;

  isLast: boolean;

  isFirst: boolean;

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
