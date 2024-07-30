import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AlreadyMember } from "./AlreadyMember";
import { authStore } from "../../store/authStore/authStore";
import { pageStore } from "../../store/pageStore/pageStore";

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
      <AlreadyMember showLogin={showLogin} setShowLogin={setShowLogin} />
      <div
        className={`backgroundLogin ${pageStore.selectedTheme === "dark" ? "backgroundDark" : "backgroundLight"}`}
      ></div>
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
