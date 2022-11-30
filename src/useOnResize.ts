import { useEffect } from "react";

export const useOnResize = (fn: () => unknown) => {
  useEffect(() => {
    window.addEventListener("resize", fn);

    return () => {
      window.removeEventListener("resize", fn);
    };
  });
};
