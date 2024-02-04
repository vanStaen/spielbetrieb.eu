import React from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { MailOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';

import { NewsletterForm } from '../../components/NewsletterForm/NewsletterForm';
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import { Header } from './Header/Header';
import { pageStore } from '../../store/pageStore/pageStore';

import './Home.less';

export const Home = observer(() => {
  const { t } = useTranslation();

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <Header />
      <div className="background invertColorTheme" id="background"></div>
      <div className="home__container">
        <div className="home__subContainer" style={{
          backgroundColor: pageStore.selectedTheme === 'dark' 
          ? 'rgba(20,36,54,.85)' 
          : 'rgba(225,195,180,.8)'
        }}>
          <div
            className="home__logoAndText invertColorTheme"
            id="spielbetrieb"
          >
            <div className="home__text">Spielbetrieb </div>
            <div className="home__subtext">
              love to love
            </div>
            <div className="home__links">
              <div className="home__link">
                <NewsletterForm />
              </div>
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
});
