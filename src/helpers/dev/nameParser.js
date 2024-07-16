export const nameParser = (json, language) => {
  if (typeof json === "undefined" || json === null) {
    return;
  }
  const obj = JSON.parse(json);
  return obj[language];
};
