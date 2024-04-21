import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// import { getTranslations } from "./getTranslations.js";
// import dataEn from "./languages/en/translation.json";
// import dataDe from "./languages/de/translation.json";

/* let dataEN = {};
let dataDE = {};

getTranslations().then((result) => {
  const translationEN = {};
  const translationDE = {};
  result.map((element) => {
    if (!(element.category in translationEN)) {
      translationEN[element.category] = {};
      translationDE[element.category] = {};
    }
    translationEN[element.category][element.key] = element.en;
    translationDE[element.category][element.key] = element.de;
    return null;
  });
  dataEN = JSON.stringify(translationEN);
  dataDE = JSON.stringify(translationEN);
  console.log(dataEN);
}); */

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "EN",
    partialBundledLanguages: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
