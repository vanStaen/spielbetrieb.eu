import React from "react";
import { observer } from "mobx-react";
import { Radio, Divider } from "antd";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { updateLanguage } from "./updateLanguage";
import { updateGender } from "./updateGender";
import { updateOrientation } from "./updateOrientation";
import { UserNameUpdate } from "./UserNameUpdate/UserNameUpdate";

export const AccountSettings = observer(() => {
  const { i18n, t } = useTranslation();
  const initLanguage = i18n.language.slice(0, 2);

  const changeLanguageHandler = (event) => {
    const value = event.target.value;
    if (value === "en") {
      i18n.changeLanguage("en-US");
    } else if (value === "fr") {
      i18n.changeLanguage("fr-FR");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
    }
    updateLanguage(value);
  };

  const changeGenderHandler = (event) => {
    const value = parseInt(event.target.value);
    userStore.setGender(value);
    updateGender(value);
  };

  const changeOrientationHandler = (event) => {
    const value = parseInt(event.target.value);
    userStore.setOrientation(value);
    updateOrientation(value);
  };

  return (
    <div className="EditSettings__container">

      <Divider orientation="left" plain className="EditSettings__divider">
        Change as you wish
      </Divider>

      <div className="EditSettings__title EditSettings__centerDiv">
        {t("settings.selectGender")}
      </div>
      <div className="EditSettings__centerDiv EditSettings__radio">
        <Radio.Group
          defaultValue={String(userStore.genderId)}
          buttonStyle="solid"
          onChange={changeGenderHandler}
        >
          <Radio.Button value="1">{t("gender.male")}</Radio.Button>
          <Radio.Button value="2">{t("gender.female")}</Radio.Button>
          <Radio.Button value="3">{t("gender.other")}</Radio.Button>
        </Radio.Group>
      </div>

      <div className="EditSettings__spacerDiv" />
      <div className="EditSettings__title EditSettings__centerDiv">
        {t("settings.selectSexualOrientation")}
      </div>

      <div className="EditSettings__centerDiv EditSettings__radio">
        <Radio.Group
          defaultValue={String(userStore.orientation)}
          buttonStyle="solid"
          onChange={changeOrientationHandler}
        >
          <Radio.Button value="1">Hetero</Radio.Button>
          <Radio.Button value="2">Homo</Radio.Button>
          <Radio.Button value="3">Bi</Radio.Button>
          <Radio.Button value="4">Other</Radio.Button>
        </Radio.Group>
      </div>

      <div className="EditSettings__spacerDiv" />
      <div className="EditSettings__title EditSettings__centerDiv">
        {t("settings.selectLanguage")}
      </div>

      <div className="EditSettings__centerDiv EditSettings__radio">
        <Radio.Group
          defaultValue={initLanguage}
          buttonStyle="solid"
          onChange={changeLanguageHandler}
        >
          <Radio.Button value="en">English</Radio.Button>
          <Radio.Button value="de">Deutsch</Radio.Button>
        </Radio.Group>
      </div>

      <div className="EditSettings__spacerDiv" />
      <Divider orientation="left" plain className="EditSettings__divider">
        Keep it steady
      </Divider>
      <UserNameUpdate />
    </div>
  );
});
