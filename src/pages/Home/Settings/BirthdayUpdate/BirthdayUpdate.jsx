import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Button, DatePicker, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { userStore } from "../../../../store/userStore/userStore";
import { updateBirthday } from "./updateBirthday";

import "./BirthdayUpdate.less";

export const BirthdayUpdate = observer(() => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState(userStore.birthday);
  const throttling = useRef(false);
  const isPartner = userStore.isPartner;

  const keyDownHandler = (event) => {
    const keyPressed = event.key?.toLowerCase();
    if (throttling.current === false) {
      throttling.current = true;
      if (keyPressed === "enter") {
        saveBirthdayHandler();
      }
    }
    setTimeout(() => {
      throttling.current = false;
    }, 100);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  const changeBirthdayHandler = (event) => {
    event ? setBirthday(event.valueOf()) : setBirthday(null);
  };

  const saveBirthdayHandler = () => {
    if (!birthday || birthday === userStore.birthday) {
      return;
    }
    updateBirthday(birthday);
    userStore.setBirthday(birthday);
    message.info("Birthday updated!");
  };

  const dateFormat = "DD MMMM YYYY";

  return (
    <div className="birthdayUpdate__container">
      <div className="birthdayUpdate__title EditSettings__centerDiv">
        {isPartner
          ? t("settings.changeStartDate")
          : t("settings.changeBirthday")}
      </div>
      <DatePicker
        defaultValue={birthday && dayjs(birthday)}
        format={dateFormat}
        maxDate={!isPartner && dayjs().subtract(18, "year")}
        onChange={changeBirthdayHandler}
        className="birthdayUpdate__input"
      />
      <Button
        type="primary"
        shape="circle"
        onClick={saveBirthdayHandler}
        className="birthdayUpdate__button"
        icon={<CheckOutlined />}
        disabled={!birthday || birthday === userStore.birthday}
      />
    </div>
  );
});
