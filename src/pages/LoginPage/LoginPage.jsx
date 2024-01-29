import React, { useState } from 'react';

import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { AlreadyMember } from './AlreadyMember';

import './LoginPage.less';

export const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <AlreadyMember showLogin={showLogin} setShowLogin={setShowLogin} />
      <div className="background invertColorTheme" id="background"></div>
      { showLogin
        ? <div className="login__container">
        <LoginForm />
      </div>
        : <div className="login__container">
        <SignUpForm />
      </div>}

    </>
  );
};
