import { useEffect } from "react";

export const useWindowBeforeUnload = (
  handler: (event: BeforeUnloadEvent) => void
) => {
  useEffect(() => {
    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [handler]);
};
