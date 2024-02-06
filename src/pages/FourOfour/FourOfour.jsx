import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip, notification } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import { pageStore } from '../../store/pageStore/pageStore';

import "./FourOfour.less";

export const FourOfour = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    notification.open({
      message: <FouroFourNotifTitle />,
      description: <FouroFourNotifDesc />,
      duration: 5,
      placement: "bottomRight",
      className: "customNotification",
    });
  })

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
          404
        </div>
        <div className={`fourofour__backArrow ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`} onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </div>
      </div>
    </>
  );
};

const FouroFourNotifTitle = () => {
  const { t } = useTranslation();
  return <div>{`❌ Error 404 -`} {t("404.pageNotFound")}</div>;
};

const FouroFourNotifDesc = () => {
  const { t } = useTranslation();
  return <div>{window.location.href} {t("404.doesNotExist")}!</div>;
};
