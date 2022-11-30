import { useId } from "react";

type UseURLReplacerArgs = {
  urls: string[];
  parts: string[];
};

// Regular expression for detecting urls in a string (https://stackoverflow.com/a/3809435/12028302)
const urlRegex =
  /(?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])/g;

const useURLReplacer = ({ urls, parts }: UseURLReplacerArgs) => {
  const id = useId();

  return () => {
    const result = [];

    for (let j = 0; j < Math.max(1, parts.length - 1); j++) {
      result.push(<span key={`${id}-${j}`}>{parts[j]}</span>);
      result.push(
        <a
          key={`${urls[j]}-${j}`}
          href={urls[j]}
          target="_blank"
          rel="noreferrer"
        >
          {urls[j]}
        </a>
      );
    }

    if (parts.length > urls.length) {
      result.push(<span key={`${id}-last`}>{parts[parts.length - 1]}</span>);
    }

    return result;
  };
};

export const useUrlParser = () => (text: string) => {
  const matches = text.matchAll(urlRegex);
  const matchesArray = Array.from(matches);
  const urls = matchesArray.flatMap((m) => m.filter(Boolean));
  const parts = text.split(urlRegex).filter(Boolean);

  const urlReplacer = useURLReplacer({ urls, parts });

  if (urls.length > 0) {
    return urlReplacer();
  }

  return <span>{text}</span>;
};
