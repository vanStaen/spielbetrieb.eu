import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { pageStore } from '../../store/pageStore/pageStore';

import './AlreadyMember.less';

export const AlreadyMember = observer((props) => {
  const { t } = useTranslation();

  return (
    <div className={`login__alreadyMember ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`}>
      <div style={{ paddingTop: '15px' }}>
        {props.showLogin
          ? (
          <>
            {t('login.newHere')}?{' '}
            <a
              className="link"
              onClick={() => props.setShowLogin(!props.showLogin)}
            >
              {t('login.signUp')}
            </a>
          </>
            )
          : (
          <>
            {t('login.member')}?{' '}
            <a
              className="link"
              onClick={() => props.setShowLogin(!props.showLogin)}
            >
              {t('login.login')}
            </a>
          </>
            )}
      </div>
      {/*
        - or -
        <Link to="/" relative="path">
                  go back
        </Link>
      */}
    </div>
  );
});
