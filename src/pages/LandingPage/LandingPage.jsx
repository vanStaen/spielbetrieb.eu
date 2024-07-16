import React, { useEffect } from "react";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  LinkOutlined,
  DoubleLeftOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { Phone } from "../../components/Phone/Phone";

import "./Merrier.less";
import "./LandingPage.less";

export const LandingPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.location.hostname === "merrier.app" &&
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
      <div
        className="landingPage__background invertColorTheme"
        id="background"
      ></div>
      <div className="landingPage__overBackground"></div>
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
            <img
              src={SpielbetriebLogo}
              id="spielbetriebLogo"
              className="spielbetrieb__logo"
              onDoubleClick={() => {
                document.location.href = "/beta";
              }}
            />
            <div className="spielbetrieb__titleContainer">
              <span className="spielbetrieb__text">Spielbetrieb</span>
              {window.location.hostname === "merrier.app" && (
                <>
                  <span className="spielbetrieb__x">x</span>
                  <span className="merrier__text">Merrier</span>
                </>
              )}
            </div>
            <div className="spielbetrieb__subtext">
              {t("general.comingsoon")}{" "}
            </div>
            <div className="spielbetrieb__links">
              <div className="spielbetrieb__link">
                <Link to="/newsletter" relative="path">
                  <Tooltip title="Newsletter" placement="bottom">
                    <NotificationOutlined />
                  </Tooltip>
                </Link>
              </div>
              <div className="spielbetrieb__link">
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
              <div className="spielbetrieb__link">
                <Tooltip title="Linktree" placement="bottom">
                  <a
                    href="https://linktr.ee/spielbetrieb"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkOutlined />
                  </a>
                </Tooltip>
              </div>
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
