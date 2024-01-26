import React from 'react';

import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import './LoginPage.less';

export const LoginPage = () => {
  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <div className="background invertColorTheme" id="background"></div>
      <div className="login__container">
        <LoginForm />
      </div>
    </>
  );
};
