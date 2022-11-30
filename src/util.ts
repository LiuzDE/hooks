import { EffectCallback, RefObject, useEffect, useRef, useState } from "react";

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

export const useOnResize = (fn: () => unknown) => {
  useEffect(() => {
    window.addEventListener("resize", fn);

    return () => {
      window.removeEventListener("resize", fn);
    };
  });
};

export const useWindowScroll = (
  fn: NonNullable<GlobalEventHandlers["onscroll"]>
) => {
  useEffect(() => {
    window.addEventListener("scroll", fn);

    return () => {
      window.removeEventListener("scroll", fn);
    };
  }, [fn]);
};

export const useCollapse = (ref: RefObject<HTMLElement>, open: boolean) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (open) {
      const height = ref.current.scrollHeight;
      ref.current.style.maxHeight = `${height}px`;
    } else {
      ref.current.style.maxHeight = "";
    }
  }, [open, ref]);
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  function handleResize() {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  return windowDimensions;
};
