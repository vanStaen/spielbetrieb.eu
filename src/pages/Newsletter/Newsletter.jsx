import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { NewsletterForm } from "./NewsletterForm";

import "./Newsletter.less";

export const Newsletter = () => {
  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <div className="background invertColorTheme" id="background"></div>
      <div className="overBackground"></div>
      <div className="Newsletter__container">
        <NewsletterForm />
      </div>
    </>
  );
};
