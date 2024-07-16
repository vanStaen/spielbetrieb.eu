import React, { useLayoutEffect, useEffect } from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/en";

import { LandingPage } from "./pages/LandingPage/LandingPage";
import { authStore } from "./store/authStore/authStore";
import { pageStore } from "./store/pageStore/pageStore";
import { userStore } from "./store/userStore/userStore";
import { AcceptCookies } from "./components/AcceptCookies/AcceptCookies";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";
import { SubscriberVerify } from "./pages/SubscriberVerify/SubscriberVerify";
import { FourOfour } from "./pages/FourOfour/FourOfour";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Home } from "./pages/Home/Home";
import { Legal } from "./pages/Legal/Legal";
import { Admin } from "./pages/Admin/Admin";
import { Newsletter } from "./pages/Newsletter/Newsletter";
import { DarkSingle } from "./pages/DarkSingle/DarkSingle";
import { Impressum } from "./components/Impressum/Impressum";
import { spielplanStore } from "./store/spielplanStore/spielplanStore";
import { TicketValidation } from "./pages/Tickets/TicketValidation/TicketValidation";
import { LanguageDropDown } from "./components/LanguageDropDown/LanguageDropDown";
import { DarkModeDropDown } from "./components/DarkModeDropDown/DarkModeDropDown";

import "./lib/i18n";

import "./App.less";
import "./styles/theme.less";
import "./styles/customAnt.less";

const defineVariableHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    defineVariableHeight();
  }, []);

  useEffect(() => {
    pageStore.fetchData();
    spielplanStore.fetchTags();
    spielplanStore.fetchEventtypes();
    authStore.checkAccess();
  }, []);

  useEffect(() => {
    userStore.fetchUserData();
  }, [authStore.hasAccess]);

  useEffect(() => {
    if (pageStore.selectedLanguage) {
      if (pageStore.selectedLanguage === "de") {
        i18n.changeLanguage("de-DE");
        dayjs.locale("de");
      } else {
        i18n.changeLanguage("en-US");
        dayjs.locale("en");
      }
    } else {
      const browserlanguage = navigator.language || navigator.userLanguage;
      if (browserlanguage === "de-DE") {
        i18n.changeLanguage("de-DE");
        pageStore.setSelectedLanguage("de");
        dayjs.locale("de");
      } else {
        i18n.changeLanguage("en-US");
        pageStore.setSelectedLanguage("en");
        dayjs.locale("en");
      }
    }
  }, [i18n, pageStore.selectedLanguage]);

  return (
    <BrowserRouter>
      <div className="App" id="app">
        <AcceptCookies />
        <div className="app__main">
          <Routes>
            <Route
              path="subscriberverify/:token"
              element={<SubscriberVerify />}
            />
            <Route path="emailverify/:token" element={<EmailVerified />} />
            <Route path="recoverpwd/:token" element={<NewPassword />} />
            <Route path="admin/" element={<Admin />} />
            <Route path="login/" element={<LoginPage />} />
            <Route path="basket/" element={<Home page="basket" />} />
            <Route path="dark/" element={<Home page="dark" />} />
            <Route path="dark/:issue" element={<DarkSingle />} />
            <Route path="partner/:username" element={<Home page="partner" />} />
            <Route path="user/:username" element={<Home page="profile" />} />
            <Route path="profile/" element={<Home page="profile" />} />
            <Route path="settings/" element={<Home page="settings" />} />
            <Route path="shop/" element={<Home page="shop" />} />
            <Route path="spielplan/" element={<Home page="spielplan" />} />
            <Route path="newsletter/" element={<Newsletter />} />
            <Route path="links/" element={<Home page="links" />} />
            <Route
              path="notifications/"
              element={<Home page="notifications" />}
            />
            <Route
              path="spielplan/week/:year/:week"
              element={<Home page="spielplan" />}
            />
            <Route
              path="spielplan/:year/:month"
              element={<Home page="spielplan" />}
            />
            <Route
              path="spielplan/:year/:month/:day"
              element={<Home page="spielplan" />}
            />
            <Route path="event/add" element={<Home page="eventform" />} />
            <Route path="event/:id" element={<Home page="eventpage" />} />
            <Route path="service/" element={<Legal page="service" />} />
            <Route path="privacy/" element={<Legal page="privacy" />} />
            <Route path="agb/" element={<Legal page="agb" />} />
            <Route path="impressum/" element={<Legal page="impressum" />} />
            <Route
              path="ticket/:event/:ticketId"
              element={<TicketValidation />}
            />
            <Route path="beta/" element={<Home page="home" />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<FourOfour />} />
          </Routes>
        </div>
        <div className="app__footer">
          <Impressum />
          <LanguageDropDown />
          <DarkModeDropDown />
        </div>
      </div>
    </BrowserRouter>
  );
});

export default App;
