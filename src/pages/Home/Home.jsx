import React from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  MailOutlined,
  LinkOutlined
} from '@ant-design/icons';

import { NewsletterForm } from '../../components/NewsletterForm/NewsletterForm';
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import { Header } from './Header/Header';

import './Home.less';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <Header />
      <div className="background invertColorTheme" id="background"></div>
      <div className="home__container">
        <div className="home__subContainer">
          <div
            className="home__logoAndText invertColorTheme"
            id="spielbetrieb"
          >
            <div className="home__text">Spielbetrieb </div>
            <div className="home__subtext">
              {t('general.commingsoon')}{' '}
            </div>
            <div className="home__links">
              <NewsletterForm />
              <div className="home__link">
                <Tooltip title="eMail" placement="bottom">
                  <a
                    href="mailto:info@spielbetrieb.online"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MailOutlined />
                  </a>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
