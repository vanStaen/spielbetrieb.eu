import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { NewsletterForm } from "./NewsletterForm";
import { pageStore } from "../../store/pageStore/pageStore";

import "./Newsletter.less";

export const Newsletter = observer(() => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`newsletter__goBack ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
      >
        <Link to="/" relative="path">
          <ArrowLeftOutlined />
        </Link>
      </div>
      <div className="newsletter__background" id="background"></div>
      <div className="newsletter__overBackground"></div>
      <div className="newsletter__container">
        <div className="newsletter__formContainer">
          <div
            className={`newsletter__header ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
          >
            {t("newsletter.subscribe")}
          </div>
          <NewsletterForm />
        </div>
      </div>
    </>
  );
});
