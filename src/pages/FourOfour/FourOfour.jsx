import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import SpielbetriebLogo from "../../img/logos/spielbetriebLogoNew.png";
import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { HelpButtons } from "../../components/HelpButtons/HelpButtons";

import "./FourOfour.less";

export const FourOfour = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <HelpButtons />
      <div className="fourofour invertColorTheme">
        <div className="fourofour__overBackground"></div>
        <Link to="../" relative="path">
          <Tooltip title="Back to main page" placement="left">
            <img
              src={SpielbetriebLogo}
              id="spielbetriebLogo"
              className="return__logo"
            />
          </Tooltip>
        </Link>
        <div className="fourofour__inner">
          <div className="fourofour__innerContainer">
            <div>404</div>
            <div className="fourofour__innerRowSubText">
              {t("404.pageNotFound")}
            </div>
          </div>
        </div>
        <div className={"fourofour__backArrow"} onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </div>
      </div>
    </>
  );
};
