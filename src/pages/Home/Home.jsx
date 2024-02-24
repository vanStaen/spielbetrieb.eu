import React from "react";
import { Tooltip } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { NewsletterForm } from "../../components/NewsletterForm/NewsletterForm";
import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { HelpButtons } from "../../components/HelpButtons/HelpButtons";
import { Header } from "./Header/Header";
import { pageStore } from "../../store/pageStore/pageStore";
import { Agenda } from "./Agenda/Agenda";
import { Basket } from "./Basket/Basket";
import { Event } from "./Event/Event";
import { Magazin } from "./Magazin/Magazin";
import { Partner } from "./Partner/Partner";
import { Profile } from "./Profile/Profile";
import { Settings } from "./Settings/Settings";
import { Shop } from "./Shop/Shop";

import "./Home.less";

export const Home = observer((props) => {
  const { page } = props;

  const renderSwitch = () => {
    switch (page) {
      case "home":
        return (
          <div className="home__homePlaceholder">
            <div
              className={`home__logoAndText ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
            >
              <div className="home__text">Spielbetrieb </div>
              <div className="home__subtext">love to love</div>
              <HelpButtons />
              <div className="home__links">
                <div className="home__link">
                  <NewsletterForm />
                </div>
                <div className="home__link">
                  <Tooltip title="eMail" placement="bottom">
                    <a
                      href="mailto:info@spielbetrieb.online"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MailOutlined />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        );
      case "spielplan":
        return <Agenda />;
      case "basket":
        return <Basket />;
      case "event":
        return <Event />;
      case "shop":
        return <Shop />;
      case "magazin":
        return <Magazin />;
      case "partner":
        return <Partner />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return "Error";
    }
  };

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <Header selected={page} />
      <div className="background invertColorTheme" id="background"></div>
      <div className="home__container">
        <div
          className="home__subContainer"
          style={{
            backgroundColor:
              pageStore.selectedTheme === "dark"
                ? "rgba(20,36,54,.85)"
                : "rgba(225,195,180,.8)",
          }}
        >
          {renderSwitch()}
        </div>
      </div>
    </>
  );
});
