import React, { useState } from "react";
import { observer } from "mobx-react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { pageStore } from "../../store/pageStore";

import "./LanguageDropDown.less";

export const LanguageDropDown = observer(() => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(pageStore.selectedLanguage);

  const onLanguageChangeHandler = (value) => {
    pageStore.setSelectedLanguage(value);
    if (value === "en") {
      i18n.changeLanguage("en-US");
      setLanguage("en");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
      setLanguage("de");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          onLanguageChangeHandler("en");
        }}
      >
        <div className="languageDropdown__item">EN</div>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          onLanguageChangeHandler("de");
        }}
      >
        <div className="languageDropdown__item">DE</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="languageDropdown invertColorTheme">
      <Dropdown overlay={menu} trigger={"click"}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {language}
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
});
