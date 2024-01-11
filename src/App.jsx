import React, { useLayoutEffect, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, notification } from "antd";

import { LanguageDropDown } from "./components/LanguageDropDown/LanguageDropDown";
import { DarkModeDropDown } from "./components/DarkModeDropDown/DarkModeDropDown";
import { LandingPage } from "./pages/LandingPage";
import { pageStore } from "./store/pageStore";

import "./lib/i18n";
import "./App.less";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  const { t, i18n } = useTranslation();
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

  useLayoutEffect(() => {
    // Define variable height
    defineVariableHeight();
  }, []);

  useEffect(() => {
    if (pageStore.selectedLanguage) {
      if (pageStore.selectedLanguage === "de") {
        i18n.changeLanguage("de-DE");
      } else {
        i18n.changeLanguage("en-US");
      }
    } else {
      const browserlanguage = navigator.language || navigator.userLanguage;
      if (browserlanguage === "de-DE") {
        i18n.changeLanguage("de-DE");
        pageStore.setSelectedLanguage("de");
      } else {
        i18n.changeLanguage("en-US");
        pageStore.setSelectedLanguage("en");
      }
    }
  }, [i18n]);

  const openAcceptCookie = () => {
    const handleAcceptCookie = (key) => {
      pageStore.setAllowCookie(true);
      notification.destroy(key);
    };
    const key = `cookieform${Date.now()}`;
    notification.destroy();
    notification.open({
      message: <>🍪 {t("legal.cookiesTitle")}</>,
      description: (
        <>
          {t("legal.cookiesDesc")}
          <Button
            className="cookie__button"
            onClick={() => handleAcceptCookie(key)}
          >
            {t("legal.accept")}
          </Button>
        </>
      ),
      duration: 0,
      placement: "bottomRight",
      className: "customNotification customNotificationBlack",
      key: key,
    });
  };

  useEffect(() => {
    if (hasRenderedOnce === false) {
      if (!pageStore.allowCookie || process.env.NODE_ENV === "development") {
        openAcceptCookie();
      }
    }
    setHasRenderedOnce(true);
  });

  return (
    <BrowserRouter>
      <div className="App" id="app">
        <div className="main">
          <LanguageDropDown />
          <DarkModeDropDown />
          <LandingPage />
        </div>
      </div>
    </BrowserRouter>
  );
});

export default App;
