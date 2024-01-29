import React from 'react';
import { useTranslation } from 'react-i18next';

import './AlreadyMember.less';

export const AlreadyMember = (props) => {
  const { t } = useTranslation();

  return (
    <div className="login__alreadyMember">
      <div style={{ paddingTop: '15px' }}>
        {props.showLogin
          ? (
          <>
            {t('login.newHere')}?{' '}
            <span
              className="link"
              onClick={() => props.setShowLogin(!props.showLogin)}
            >
              {t('login.signUp')}
            </span>
          </>
            )
          : (
          <>
            {t('login.member')}?{' '}
            <span
              className="link"
              onClick={() => props.setShowLogin(!props.showLogin)}
            >
              {t('login.login')}
            </span>
          </>
            )}
      </div>
    </div>
  );
};
