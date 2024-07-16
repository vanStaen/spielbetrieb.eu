import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { postSubscriberVerified } from "./postSubscriberVerified";
import { CustomSpinner } from "../../components/CustomSpinner/CustomSpinner";
import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { pageStore } from "../../store/pageStore/pageStore";

import "./SubscriberVerify.less";

export const SubscriberVerify = observer(() => {
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
      <div className="background invertColorTheme" id="background"></div>
      <div className="overBackground"></div>
      <div className="subscriberVerifyEmail__container">
        {isLoading ? (
          <CustomSpinner size="large" text="Validating" />
        ) : (
          <>
            <div
              className={`subscriberVerifyEmail__text ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
            >
              {isVerified
                ? t("newsletter.emailVerified")
                : t("newsletter.verificationError")}
            </div>
            <Tooltip title={t("general.backTomainScreen")} placement="bottom">
              <Link to="../../" relative="path">
                <img
                  src={SpielbetriebLogo}
                  id="spielbetriebLogo"
                  className={`subscriberVerifyEmail__logo ${pageStore.selectedTheme === "dark" && "theme__logoInvertColor"}`}
                />
              </Link>
            </Tooltip>
          </>
        )}
      </div>
    </>
  );
});
