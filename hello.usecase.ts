import { Logger } from "./logger.aop";

export interface IUseCase<I, O> {
  execute(input: I): O;
}

export class HelloUseCase implements IUseCase<string, string> {
  @Logger()
  execute(input: string): string {
    return `Hello, ${input}!`;
  }
}
