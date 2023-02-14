export interface ITemplater {
  template: (input: string, data?: Record<string, unknown>) => string;
}
