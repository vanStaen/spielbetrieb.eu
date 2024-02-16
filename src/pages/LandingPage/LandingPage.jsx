import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DoubleLeftOutlined } from "@ant-design/icons";

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { Phone } from "../../components/Phone/Phone";
import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { Menu } from "../../components/Menu/Menu";

import "./Merrier.less";
import "./LandingPage.less";

export const LandingPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      arrowClickHandler();
    }, "1000");
  });

  const arrowClickHandler = () => {
    const elementPhone = document.getElementById("phone");
    const elementSpielbetrieb = document.getElementById("spielbetrieb");
    const elementArrow = document.getElementById("arrow");
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 675) {
      elementPhone.style.transform = "translate3d(-33vw, -3%, 0)";
      elementSpielbetrieb.style.transform = "translate3d(-15vw, 0%, 0)";
      elementArrow.style.display = "none";
    }
  };

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <div className="background invertColorTheme" id="background"></div>
      <div className="landingPage__doublearrow invertColorTheme" id="arrow">
        <DoubleLeftOutlined
          onClick={arrowClickHandler}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="landingPage__container">
        <div className="spielbetrieb__container">
          <div
            className="spielbetrieb__logoAndText invertColorTheme"
            id="spielbetrieb"
          >
            <a href="https://spielbetrieb.eu" target="_blank" rel="noreferrer">
              <img
                src={SpielbetriebLogo}
                id="spielbetriebLogo"
                className="spielbetrieb__logo"
              />
            </a>
            <div className="spielbetrieb__titleContainer">
              <span className="spielbetrieb__text">Spielbetrieb</span>
              <span className="spielbetrieb__x">x</span>
              <span className="merrier__text">Merrier</span>
            </div>
            <div className="spielbetrieb__subtext">
              {t("general.commingsoon")}{" "}
            </div>
          </div>
        </div>
        <div className="phone__container">
          <div className="phone" id="phone">
            <Phone
              color="white"
              content={
                <div className="merrier__container invertColorTheme">
                  <div className="merrier__background"></div>
                  <img src={SpielbetriebLogo} className="merrier__biglogo" />
                  <div className="merrier__title">Merrier</div>
                  <div className="merrier__subtitle">by Spielbetrieb</div>
                </div>
              }
            />
          </div>
        </div>
        <div className="phone__mobileContainer">
          <Phone
            color="white"
            content={
              <div className="merrier__container invertColorTheme">
                <div className="merrier__background"></div>
                <img src={SpielbetriebLogo} className="merrier__biglogo" />
                <div className="merrier__title">Merrier</div>
                <div className="merrier__subtitle">by Spielbetrieb</div>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};
