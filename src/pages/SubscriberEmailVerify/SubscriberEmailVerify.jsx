import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Tooltip } from "antd";

import { postSubscriberVerified } from "./postSubscriberVerified";
import { CustomSpinner } from "../../components/CustomSpinner/CustomSpinnner";
import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";

import "./SubscriberEmailVerify.less";

export const SubscriberEmailVerify = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const emailIsVerified = useCallback(async () => {
    const success = await postSubscriberVerified(params.verifyCode);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        document.location.href = "/";
      }, 10000);
    }
    setIsLoading(false);
  }, [params.verifyCode]);

  useEffect(() => {
    console.log("params.verifyCode", params.key);
    //emailIsVerified();
  }, [emailIsVerified]);

  return (
    <>
      <div className="background invertColorTheme" id="background"></div>
      <div className="subscriberVerifyEmail__container invertColorTheme">
        {isLoading ? (
          <CustomSpinner size="large" text="validating" />
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
