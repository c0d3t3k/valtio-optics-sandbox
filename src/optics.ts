import { subscribe, proxy } from "valtio";
import O from "optics-ts";
import produce from "immer";
import { useRef } from "react";

const SENTINEL = {};

// From https://github.com/facebook/react/issues/14490#issuecomment-451924162
export function useRefFn<T>(init: () => T) {
    const ref = useRef<T | typeof SENTINEL>(SENTINEL);
    if (ref.current === SENTINEL) {
        ref.current = init();
    }
    return ref as React.MutableRefObject<T>;
}

export type AnyOptic<S, A> =
  | O.Lens<S, any, A>
  | O.Equivalence<S, any, A>
  | O.Iso<S, any, A>
  | O.Prism<S, any, A>
  | O.Traversal<S, any, A>;

const getValueUsingOptic = <S, A>(
  focus:
    | O.Lens<S, any, A>
    | O.Equivalence<S, any, A>
    | O.Iso<S, any, A>
    | O.Prism<S, any, A>
    | O.Traversal<S, any, A>,
  bigValue: S
) => {
  if (focus._tag === "Traversal") {
    const values = O.collect(focus)(bigValue);
    return values;
  }
  if (focus._tag === "Prism") {
    const value = O.preview(focus)(bigValue);
    return value;
  }
  const value = O.get(focus)(bigValue);
  return value;
};

// From https://stackoverflow.com/a/31538091
const isPrimitive = (val: any) => {
  return (val !== Object(val));
}

export type MaybeSetter<T> = T | ((val: T) => T);
export type MaybeOptic<T> = O.OpticFor<T> | (() => O.OpticFor<T>);

export type InnerProxyWrapper<T> = { value: T }

export const useProxyFocus = <TBlur extends object, TFocus extends object>(
  proxyObject: TBlur,
  optic: O.OpticFor<TBlur>
): TFocus => {
  const initializeValue = (value: TFocus) => ({ value } as InnerProxyWrapper<TFocus>)

  const getter = (val: TBlur): TFocus =>
    (produce((val) => getValueUsingOptic<TBlur, TFocus>(optic as any, val))(
      val
    ) as unknown) as TFocus;

  const setter = (val: TBlur, setVal: TFocus) => {
    const isArray = Array.isArray(innerProxyRef);

    const blurredNewVal = 

    if(isArray) {
      va
    }
  }

  const innerProxyRef = useRefFn(() => proxy<InnerProxyWrapper<TFocus>>(initializeValue(getter(proxyObject))));

  

  let prevValue = proxyObject[key];
  return subscribe(proxyObject, () => {
    const nextValue = proxyObject[key];
    if (!Object.is(prevValue, nextValue)) {
      callback((prevValue = nextValue));
    }
  });
};
