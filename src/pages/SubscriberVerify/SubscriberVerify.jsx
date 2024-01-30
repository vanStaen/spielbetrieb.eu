import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Tooltip } from "antd";

import { postSubscriberVerified } from "./postSubscriberVerified";
import { CustomSpinner } from "../../components/CustomSpinner/CustomSpinnner";
import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";

import "./SubscriberVerify.less";

export const SubscriberVerify = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const emailIsVerified = useCallback(async () => {
    const success = await postSubscriberVerified(params.token);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        document.location.href = "/";
      }, 5000);
    }
    setIsLoading(false);
  }, [params.verifyCode]);

  useEffect(() => {
    emailIsVerified();
  }, [emailIsVerified]);

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <div className="background invertColorTheme" id="background"></div>
      <div className="subscriberVerifyEmail__container invertColorTheme">
        {isLoading ? (
          <CustomSpinner size="large" text="Validating" />
        ) : (
          <>
            <div className="subscriberVerifyEmail__text">
              {isVerified
                ? t("newsletter.emailVerified")
                : t("newsletter.verificationError")}
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
          </>
        )}
      </div>
    </>
  );
};
