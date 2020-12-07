import { subscribe, proxy } from "valtio";
import O from "optics-ts";

export const useProxyFocus = <TBlur extends object, TFocus>(
  proxyObject: TBlur,
  optic: O.OpticFor<TBlur>
): TFocus => {
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

  let prevValue = proxyObject[key];
  return subscribe(proxyObject, () => {
    const nextValue = proxyObject[key];
    if (!Object.is(prevValue, nextValue)) {
      callback((prevValue = nextValue));
    }
  });
};
