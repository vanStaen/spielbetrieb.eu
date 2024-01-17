import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Tooltip } from "antd";

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";

import "./SubscriberEmailVerify.less";

export const SubscriberEmailVerify = () => {
  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    console.log("params.verifyCode", params.key);
  }, []);

  return (
    <>
      <div className="background invertColorTheme" id="background"></div>
      <div className="subscriberVerifyEmail__container invertColorTheme">
        <div className="subscriberVerifyEmail__text">
          {t("newsletter.emailVerified")}
        </div>
        <Tooltip title={t("general.backTomainScreen")} placement="bottom">
          <Link to="../../" relative="path">
            <img
              src={SpielbetriebLogo}
              id="spielbetriebLogo"
              className="subscriberVerifyEmail__logo"
            />
          </Link>
        </Tooltip>
      </div>
    </>
  );
};
