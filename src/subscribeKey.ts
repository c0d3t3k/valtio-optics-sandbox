import { subscribe } from "valtio";

/**
 * subscribeKey
 *
 * The subscribeKey utility enables subscription to a primitive subproperty of a given state proxy.
 * Subscriptions created with subscribeKey will only fire when the specified property changes.
 *
 * @example
 * import { subscribeKey } from 'valtio/utils'
 * subscribeKey(state, 'count', (v) => console.log('state.count has changed to', v))
 */
export const subscribeKey = <T extends object>(
  proxyObject: T,
  key: keyof T,
  callback: (value: T[typeof key]) => void
) => {
  let prevValue = proxyObject[key];
  return subscribe(proxyObject, () => {
    const nextValue = proxyObject[key];
    if (!Object.is(prevValue, nextValue)) {
      callback((prevValue = nextValue));
    }
  });
};
