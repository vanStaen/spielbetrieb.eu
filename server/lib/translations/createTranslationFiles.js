import fs from "fs";
import getTranslations from "./getTranslations.js";

export async function createTranslationFiles() {
  const translationData = await getTranslations();
  const translationEN = {};
  const translationDE = {};

  translationData.map((element) => {
    if (!(element.category in translationEN)) {
      translationEN[element.category] = {};
      translationDE[element.category] = {};
    }
    translationEN[element.category][element.key] = element.en;
    translationDE[element.category][element.key] = element.de;
    return null;
  });

  fs.writeFile(
    "./public/locales/en/translation.json",
    JSON.stringify(translationEN, null, "\t"),
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
  fs.writeFile(
    "./public/locales/de/translation.json",
    JSON.stringify(translationDE, null, "\t"),
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
}
