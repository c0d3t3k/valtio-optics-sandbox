import { subscribe } from "valtio";
import O from "optics-ts";

export const useProxyFocus = <TBlur extends object, TFocus>(
  proxyObject: TBlur,
  optic: O.OpticFor<TBlur>
): TFocus => {
  let prevValue = proxyObject[key];
  return subscribe(proxyObject, () => {
    const nextValue = proxyObject[key];
    if (!Object.is(prevValue, nextValue)) {
      callback((prevValue = nextValue));
    }
  });
};
