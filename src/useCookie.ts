import { useState } from "react";
import { useOnMount } from "./util";

export const useCookie = <CookieValue extends string>(cookieName: string) => {
  const [value, setValue] = useState("");

  const getCookie = (): CookieValue | "" => {
    if (typeof window === "undefined") {
      return "";
    }

    return document.cookie.split(";").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0].trim() === cookieName ? decodeURIComponent(parts[1]) : r;
    }, "") as CookieValue | "";
  };

  const setCookie = (value: CookieValue) => {
    if (typeof window === "undefined") {
      return;
    }

    const secure = process.env.NODE_ENV !== "development";
    const domain = window.location.hostname;

    const expires = new Date(
      Date.now() + 15330 * 864e5 // ~42 years
    ).toUTCString();

    document.cookie = `${cookieName}=${encodeURIComponent(
      value
    )};expires=${expires};path=/;SameSite=Lax;domain=${domain};${
      secure ? "secure;" : ""
    }`;
  };

  useOnMount(() => {
    setValue(getCookie());
  });

  return [
    value,
    (v: CookieValue) => {
      setCookie(v);
      setValue(v);
    },
  ] as const;
};
