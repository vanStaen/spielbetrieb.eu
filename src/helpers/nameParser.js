export const nameParser = (json, language) => {
  const obj = JSON.parse(json);
  return obj[language];
}