export interface ITemplater {
  template: (input: string, data: Record<string, unknown>) => string;
}

export interface ITemplaterIteration {
  index: number;

  isLast: boolean;

  isFirst: boolean;

  increment(): void;
}
