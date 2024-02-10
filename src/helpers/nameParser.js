export const nameParser = (json, language) => {
  if (typeof(json) != "undefined") {
    return
  }
  const obj = JSON.parse(json);
  return obj[language];
}