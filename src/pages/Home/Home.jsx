import React from "react";
import { Tooltip } from "antd";
import { MailOutlined, NotificationOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { HelpButtons } from "../../components/HelpButtons/HelpButtons";
import { Header } from "./Header/Header";
import { pageStore } from "../../store/pageStore/pageStore";
import { Spielplan } from "./Spielplan/Spielplan";
import { Basket } from "./Basket/Basket";
import { Dark } from "./Dark/Dark";
import { Profile } from "./Profile/Profile";
import { Settings } from "./Settings/Settings";
import { Shop } from "./Shop/Shop";
import { EventPage } from "./Event/EventPage/EventPage";
import { Links } from "./Links/Links";
import { EventForm } from "./Event/EventForm/EventForm";
import { GalleryOverlay } from "../../components/GalleryOverlay/GalleryOverlay";
import { spielplanStore } from "../../store/spielplanStore/spielplanStore";
import { Banner } from "../../components/Banner/Banner";
import { Notifications } from "./Notifications/Notifications";

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
                  <Link to="/newsletter" relative="path">
                    <Tooltip title="Newsletter" placement="bottom">
                      <NotificationOutlined />
                    </Tooltip>
                  </Link>
                </div>
                <div className="home__link">
                  <Tooltip title="eMail" placement="bottom">
                    <a
                      href="mailto:info@spielbetrieb.eu"
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
        return <Spielplan />;
      case "eventpage":
        return <EventPage event={spielplanStore.selectedEvent} />;
      case "eventform":
        return <EventForm />;
      case "basket":
        return <Basket />;
      case "shop":
        return <Shop />;
      case "dark":
        return <Dark />;
      case "partner":
        // TODO: make a partner component
        return <Profile />;
      case "profile":
        // TODO: First check if profile can be shown (in setting, show to friend or not). The check should happen in the backend as the api should not return data if it is the case.
        return <Profile />;
      case "settings":
        return <Settings />;
      case "links":
        return <Links />;
      case "notifications":
        return <Notifications />;
      default:
        return "Error" + page;
    }
  };

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      {pageStore.showOverlayGallery && <GalleryOverlay />}
      <Header selected={page} />
      {process.env.PROD && (
        <Banner
          desc="* THIS IS A BETA VERSION * USE FOR TESTING ONLY * "
          id={"betaBanner"}
          show={true}
        />
      )}
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
