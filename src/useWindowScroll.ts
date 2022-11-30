import { useEffect } from "react";

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
