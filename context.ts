import { v4 as uuidv4 } from "uuid";
import async_hooks from "async_hooks";

const localStore = new Map<number, any>();

const asyncHook = async_hooks.createHook({
  init: (asyncId: number, _: any, triggerAsyncId: number) => {
    if (localStore.has(triggerAsyncId)) {
      localStore.set(asyncId, localStore.get(triggerAsyncId));
    }
  },
  destroy: (asyncId: number) => {
    if (localStore.has(asyncId)) {
      localStore.delete(asyncId);
    }
  },
});

asyncHook.enable();

export const updateRequestContext = (data: any) => {
  const requestData = getRequestContext();
  const newData = { ...requestData, ...data };
  localStore.set(async_hooks.executionAsyncId(), newData);
  return newData;
};

export const getRequestContext = () => {
  return localStore.get(async_hooks.executionAsyncId());
};
