export const createNameObject = (option) => {
  const objet = `{en:${option}, de:${option}}`;
  return JSON.stringify(objet);
};
