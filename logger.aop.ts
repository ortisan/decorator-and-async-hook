import { getRequestContext } from "./context";

export function Logger() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const context = getRequestContext();
      const initTime = Date.now();
      console.log("before method() called" + JSON.stringify(context));
      try {
        const result = targetMethod.apply(this, args);
        console.log("method() returned");
        return result;
      } catch (error) {
        console.error("method() throw an error");
        throw error;
      } finally {
        console.log(`Execution time: ${Date.now() - initTime}ms`);
      }
    };

    return descriptor;
  };
}
