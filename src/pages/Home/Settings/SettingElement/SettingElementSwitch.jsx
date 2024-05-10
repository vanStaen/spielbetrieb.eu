
import React from "react";
import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { updateSettings } from "./updateSettings";
import { userStore } from "../../../../store/userStore/userStore";

import './SettingElement.less';

export const SettingElementSwitch = (props) => {

    const { title, value, setting, type } = props;

    const changeSettingsHandler = () => {
        const tempSettings = userStore[type];
        tempSettings[setting] = !value;
        if (type === 'emailSettings') {
            userStore.setEmailSettings(tempSettings);
            updateSettings(tempSettings, userStore.profilSettings);
        } else if (type === 'profilSettings') {
            userStore.setProfilSettings(tempSettings);
            updateSettings(userStore.emailSettings, tempSettings);
        }
    };

    return (
        <div className="settingElement__container">
            <Switch
                className="settingElement__switch"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={() => {
                    changeSettingsHandler();
                }}
                checked={value}
            />
            {title}
        </div>
    )

}