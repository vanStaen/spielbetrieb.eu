import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AlreadyMember } from "./AlreadyMember";
import { authStore } from "../../store/authStore/authStore";

import "./LoginPage.less";

export const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.hasAccess) {
      navigate("/");
    }
  });

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <AlreadyMember showLogin={showLogin} setShowLogin={setShowLogin} />
      <div className="background invertColorTheme" id="background"></div>
      <div className="overBackground"></div>
      {showLogin ? (
        <div className="login__container">
          <LoginForm />
        </div>
      ) : (
        <div className="login__container">
          <SignUpForm inviteCode="earlybird2024" setShowLogin={setShowLogin} />
        </div>
      )}
    </>
  );
};
