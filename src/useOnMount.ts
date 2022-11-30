import { EffectCallback, useEffect, useRef } from "react";

export const useOnMount = (effect: EffectCallback) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
