import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { pageStore } from '../../store/pageStore/pageStore';

import './DarkModeDropDown.less';

export const DarkModeDropDown = observer(() => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(pageStore.selectedTheme);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    const selectedClasses = document.getElementsByClassName('invertColorTheme');
    for (let i = 0, il = selectedClasses.length; i < il; i++) {
      selectedClasses[i].style.filter = `invert(${theme === "dark" ? 0 : 1 })`;
    }
  }, [theme]);

  const handleThemeChange = (value) => {
    pageStore.setSelectedTheme(value);
    setTheme(value);
    setShowThemeMenu(false);
  };

  return (
    <div className='darkModeDropdown__container'>
      <div 
        className={`darkModeDropdown ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`}
        onClick={() => {
          setShowThemeMenu(!showThemeMenu);
        }}
      >
        {theme === "dark" ? t('general.dark') : t('general.light')}
      </div>
      {showThemeMenu &&  
        <div
          className={`darkModeDropdown__menu ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__Menu' : 'darkColorTheme__Menu'}`}
          id="darkModeDropdownContainer"
          onMouseLeave={() => { setShowThemeMenu(false); }}
        >
          <div 
            className="menu__element"
            onClick={() => {
              handleThemeChange('dark');
            }}>
            {t('general.dark')}
          </div>
          <div 
            className="menu__element"  
            onClick={() => {
              handleThemeChange('light');
            }}>
            {t('general.light')}
          </div>
        </div>
      }
    </div>
  );
});
