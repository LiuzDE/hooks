import { RefObject, useEffect } from "react";

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
