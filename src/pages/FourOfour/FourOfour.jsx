import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";

import "./FourOfour.less";

export const FourOfour = () => {
  const { t } = useTranslation();

  return (
    <>
    <LanguageDropDown />
    <DarkModeDropDown />
        <Link to="../" relative="path">
          <Tooltip title="Back to main page" placement="left">
            <img
              src={SpielbetriebLogo}
              id="spielbetriebLogo"
              className="return__logo"
            />
          </Tooltip>
        </Link>
      <div className="fourofour invertColorTheme">
        <div className="fourofour_inner">404</div>
      </div>
    </>
  );
};
