import React from 'react';
import { Input } from "antd";
import { useTranslation } from "react-i18next";

import { userStore } from '../../../../store/userStore/userStore';

export const LocationUpdate = () => {
    const { t } = useTranslation();

    const changeLocationHandler = (event) => {
        console.log(event.target.value);
    }

    return (
        <div className="UserNameUpdate__container">
            <div className="UserNameUpdate__title EditSettings__centerDiv">
                {t("settings.changeLocation")}
            </div>
            <Input
                placeholder={userStore.location}
                onChange={changeLocationHandler}
            />
        </div>
    )
}