import React from 'react';
import { Input } from "antd";
import { AimOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

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
                placeholder={null}
                prefix={<AimOutlined className="site-form-item-icon" />}
                onChange={changeLocationHandler}
            />
        </div>
    )
}