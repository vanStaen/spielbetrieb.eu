import React, { useState } from "react";
import { observer } from "mobx-react";
import { Radio, Divider } from "antd";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { pageStore } from "../../../store/pageStore/pageStore";
import { updateLanguage } from "./updateLanguage";
import { updateGender } from "./updateGender";
import { updateOrientation } from "./updateOrientation";
import { UserNameUpdate } from "./UserNameUpdate/UserNameUpdate";
import { LocationUpdate } from "./LocationUpdate/LocationUpdate";
import { BirthdayUpdate } from "./BirthdayUpdate/BirthdayUpdate";
import { nameParser } from "../../../helpers/dev/nameParser";

export const AccountSettings = observer(() => {
  const { i18n, t } = useTranslation();
  const initLanguage = userStore.language?.slice(0, 2);
  const [showAllGenders, setShowAllGenders] = useState(false);
  const [showAllOrientations, setShowAllOrientations] = useState(false);

  const changeLanguageHandler = (event) => {
    const value = event.target.value;
    if (value.includes("en")) {
      i18n.changeLanguage("en-US");
    } else if (value.includes("fr")) {
      i18n.changeLanguage("fr-FR");
    } else if (value.includes("de")) {
      i18n.changeLanguage("de-DE");
    }
    pageStore.setSelectedLanguage(value);
    updateLanguage(value);
  };

  const changeGenderHandler = (event) => {
    const value = parseInt(event.target.value);
    if (value === 0) {
      setShowAllGenders(true);
    } else {
      userStore.setGenderId(value);
      updateGender(value);
    }
  };

  const changeOrientationHandler = (event) => {
    const value = parseInt(event.target.value);
    if (value === 0) {
      setShowAllOrientations(true);
    } else {
      userStore.setOrientationId(value);
      updateOrientation(value);
    }
  };

  // genders options
  const gendersOptionsShort = pageStore.genders.map((gender) => {
    if (gender.id > 3) {
      return null;
    }
    return (
      <Radio.Button value={parseInt(gender.id)} key={gender.id}>
        {nameParser(gender.name, pageStore.selectedLanguage)}
      </Radio.Button>
    );
  });
  if (userStore.genderId > 3) {
    const genderName = pageStore.genders.find(
      (gender) => parseInt(gender.id) === parseInt(userStore.genderId),
    )?.name;
    gendersOptionsShort.push(
      <Radio.Button value={userStore.genderId} key={userStore.genderId} >
        {nameParser(genderName, pageStore.selectedLanguage)}
      </Radio.Button>,
    );
  }
  gendersOptionsShort.push(<Radio.Button value={0} key='more'>...</Radio.Button>);
  const gendersOptionsFull = pageStore.genders.map((gender, index) => {
    return (
      <Radio.Button value={parseInt(gender.id)} key={gender.id}>
        {nameParser(gender.name, pageStore.selectedLanguage)}
      </Radio.Button>
    );
  });

  // orientations options
  const orientationsOptionsShort = pageStore.orientations.map((orientation, index) => {
    if (orientation.id > 3) {
      return null;
    }
    return (
      <Radio.Button value={parseInt(orientation.id)} key={orientation.id}>
        {nameParser(orientation.name, pageStore.selectedLanguage)}
      </Radio.Button>
    );
  });
  if (userStore.orientationId > 3) {
    const orientationName = pageStore.orientations.find(
      (orientation) =>
        parseInt(orientation.id) === parseInt(userStore.orientationId),
    )?.name;
    orientationsOptionsShort.push(
      <Radio.Button value={userStore.orientationId} key={userStore.orientationId}>
        {nameParser(orientationName, pageStore.selectedLanguage)}
      </Radio.Button>,
    );
  }
  orientationsOptionsShort.push(<Radio.Button value={0} key="more">...</Radio.Button>);
  const orientationsOptionsFull = pageStore.orientations.map((orientation) => {
    return (
      <Radio.Button value={parseInt(orientation.id)} key={orientation.id}>
        {nameParser(orientation.name, pageStore.selectedLanguage)}
      </Radio.Button>
    );
  });

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
          defaultValue={userStore.genderId}
          buttonStyle="solid"
          onChange={changeGenderHandler}
        >
          {showAllGenders ? gendersOptionsFull : gendersOptionsShort}
        </Radio.Group>
      </div>

      <div className="EditSettings__spacerDiv" />
      <div className="EditSettings__title EditSettings__centerDiv">
        {t("settings.selectSexualOrientation")}
      </div>

      <div className="EditSettings__centerDiv EditSettings__radio">
        <Radio.Group
          defaultValue={userStore.orientationId}
          buttonStyle="solid"
          onChange={changeOrientationHandler}
        >
          {showAllOrientations
            ? orientationsOptionsFull
            : orientationsOptionsShort}
        </Radio.Group>
      </div>
      <div className="EditSettings__spacerDiv" />
      <LocationUpdate />

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

      <BirthdayUpdate />
      <div className="EditSettings__spacerDiv" />
      <UserNameUpdate />
    </div>
  );
});
