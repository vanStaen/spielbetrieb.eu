import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

import { pageStore } from '../../store/pageStore/pageStore';

import './DarkModeDropDown.less';

export const DarkModeDropDown = observer(() => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(pageStore.selectedTheme);

  useEffect(() => {
    const selectedClasses = document.getElementsByClassName('invertColorTheme');
    for (let i = 0, il = selectedClasses.length; i < il; i++) {
      selectedClasses[i].style.filter = `invert(${theme})`;
    }
  }, [theme]);

  const handleThemeChange = (value) => {
    console.log('theme', value);
    pageStore.setSelectedTheme(value);
    setTheme(value);
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="dark"
        onClick={() => {
          handleThemeChange(0);
        }}
      >
        <div className="darkmodeDropdown__item">{t('general.dark')}</div>
      </Menu.Item>
      <Menu.Item
        key="light"
        onClick={() => {
          handleThemeChange(1);
        }}
      >
        <div className="darkmodeDropdown__item">{t('general.light')}</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="darkmodeDropdown invertColorTheme">
      <Dropdown overlay={menu} trigger={'click'}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {theme == 0 ? t('general.dark') : t('general.light')}
        </a>
      </Dropdown>
    </div>
  );
});
