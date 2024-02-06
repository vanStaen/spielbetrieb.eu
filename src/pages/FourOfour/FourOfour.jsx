import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import { pageStore } from '../../store/pageStore/pageStore';

import "./FourOfour.less";

export const FourOfour = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        <div className="fourofour__inner">
          <div className="fourofour__innerContainer">
            <div>404</div>
            <div className="fourofour__innerRowSubText">
              {t("404.pageNotFound")}
            </div>
          </div>
        </div>
        <div className={`fourofour__backArrow ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`} onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </div>
      </div>
    </>
  );
};
