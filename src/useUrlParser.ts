type UseURLParserResult = {
  type: "url" | "text";
  value: string;
};

// Regular expression for detecting urls in a string (https://stackoverflow.com/a/3809435/12028302)
const urlRegex =
  /(?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])/g;

export const useUrlParser = () => (text: string) => {
  const result: UseURLParserResult[] = [];
  const matches = text.matchAll(urlRegex);
  const matchesArray = Array.from(matches);
  const urls = matchesArray.flatMap((m) => m.filter(Boolean));
  const parts = text.split(urlRegex).filter(Boolean);

  for (let j = 0; j < Math.max(1, parts.length - 1); j++) {
    result.push({
      type: "text",
      value: parts[j],
    });
    result.push({
      type: "url",
      value: urls[j],
    });
  }

  if (parts.length > urls.length) {
    result.push({
      type: "text",
      value: parts[parts.length - 1],
    });
  }

  return result;
};
