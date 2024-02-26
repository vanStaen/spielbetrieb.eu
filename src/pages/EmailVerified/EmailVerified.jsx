/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { postEmailVerified } from "./postEmailVerified";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { CustomSpinner } from "../../components/CustomSpinner/CustomSpinnner";
import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { pageStore } from "../../store/pageStore/pageStore";

import "./EmailVerified.less";

export const EmailVerified = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { t } = useTranslation();
  const params = useParams();

  const emailIsVerified = useCallback(async () => {
    const success = await postEmailVerified(params.token);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        document.location.href = "/";
      }, 10000);
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
      <div className="verifyEmail__container">
        {isLoading ? (
          <CustomSpinner size="large" text="Validating" />
        ) : (
          <>
            {isVerified ? (
              <div
                className={`verifyEmail__text ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
              >
                <strong>{t("login.emailVerified")}</strong> <br />
                {t("login.welcomeInOurCommunity")}!<br />
                {t("login.goAheadAndLogin")}.
                <br />
                <br />
                <div>
                  {t("login.redirectedToThe")}{" "}
                  <span
                    className="link"
                    onClick={() => {
                      document.location.href = "/";
                    }}
                  >
                    {" "}
                    {t("login.loginPage")}
                  </span>
                  .
                </div>
              </div>
            ) : (
              <div
                className={`verifyEmail__text ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
              >
                <strong>{t("login.emailNotVerified")}!</strong>
                <br />
                <br />
                {t("login.somethingWrongEmail")}!
                <br />
                <div>
                  {t("login.whatCanYouDo")}{" "}
                  <span
                    className="link"
                    onClick={() => {
                      document.location.href = "/";
                    }}
                  >
                    {t("login.loginPage")}
                  </span>
                  {", "}
                  {t("login.requestNewLink")}.
                </div>
              </div>
            )}
            <Tooltip title={t("general.backTomainScreen")} placement="bottom">
              <Link to="../../" relative="path">
                <img
                  src={SpielbetriebLogo}
                  id="spielbetriebLogo"
                  className={`verifyEmail__logo ${pageStore.selectedTheme === "dark" && "theme__logoInvertColor"}`}
                />
              </Link>
            </Tooltip>
          </>
        )}
      </div>
    </>
  );
});
