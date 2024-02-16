import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { pageStore } from "../../store/pageStore/pageStore";

import "./LanguageDropDown.less";

export const LanguageDropDown = observer(() => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(pageStore.selectedLanguage);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const onLanguageChangeHandler = (value) => {
    pageStore.setSelectedLanguage(value);
    if (value === "en") {
      i18n.changeLanguage("en-US");
      setLanguage("en");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
      setLanguage("de");
    }
  };

  useEffect(() => {
    setLanguage(pageStore.selectedLanguage);
  }, [pageStore.selectedLanguage]);

  return (
    <div className="languageDropdown__container">
      <div
        className={`languageDropdown ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
        onClick={() => {
          setShowLanguageMenu(!showLanguageMenu);
        }}
      >
        {language}
      </div>
      {showLanguageMenu && (
        <div
          className={`languageDropdown__menu ${pageStore.selectedTheme === "light" ? "lightColorTheme__Menu" : "darkColorTheme__Menu"}`}
          id="languageDropdownContainer"
          onMouseLeave={() => {
            setShowLanguageMenu(false);
          }}
        >
          <div
            className="menu__element"
            onClick={() => {
              onLanguageChangeHandler("en");
              setShowLanguageMenu(false);
            }}
          >
            🇬🇧
          </div>
          <div
            className="menu__element"
            onClick={() => {
              onLanguageChangeHandler("de");
              setShowLanguageMenu(false);
            }}
          >
            🇩🇪
          </div>
        </div>
      )}
    </div>
  );
});
