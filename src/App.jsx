import React, { useLayoutEffect, useEffect } from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LandingPage } from "./pages/LandingPage/LandingPage";
import { pageStore } from "./store/pageStore";
import { AcceptCookies } from "./components/AcceptCookies/AcceptCookies";
import { SubscriberEmailVerify } from "./pages/SubscriberEmailVerify/SubscriberEmailVerify";
import { Admin } from "./pages/Admin/Admin";

import "./lib/i18n";
import "./App.less";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  const { t, i18n } = useTranslation();

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
  }, [i18n, pageStore.selectedLanguage]);

  return (
    <BrowserRouter>
      <div className="App" id="app">
        <AcceptCookies />
        <div className="main">
          <Routes>
            <Route
              path="subscriberverify/:token"
              element={<SubscriberEmailVerify />}
            />
            <Route path="admin/" element={<Admin />} />
            <Route path="/" element={<LandingPage />} />
            {/* default redirect to LandingPage */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter >
  );
});

export default App;
