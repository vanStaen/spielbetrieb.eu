import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { notification, Tooltip } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

export const NewsletterForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("info@merrier.app");

  const openNotification = () => {
    notification.open({
      message: <> 📣 &nbsp;{t("newsletter.subscribe")}</>,
      description: (
        <>
          Sign up to be first to know about Spielbetrieb & Merrier latest news
          {email}
        </>
      ),
      duration: 0,
      placement: "bottomRight",
      className: "customNotification",
    });
  };

  return (
    <Tooltip title="Newsletter" placement="bottom">
      <NotificationOutlined onClick={openNotification} />
    </Tooltip>
  );
};
