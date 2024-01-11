import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { notification, Tooltip, Button, Input, Space } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

import { validateEmail } from "../../helpers/validateEmail";

import "./NewsletterForm.less";

export const NewsletterForm = () => {
  const { t } = useTranslation();
  const [formAlreadyOpen, setFormAlreadyOpen] = useState(false);

  const openNotification = () => {
    notification.open({
      message: <FormTitle />,
      description: <FormDesc />,
      duration: 0,
      placement: "bottomRight",
      className: "customNotification",
      onClose: () => {
        setFormAlreadyOpen(false);
      },
    });
  };

  const handleNewsletterClick = () => {
    if (!formAlreadyOpen) {
      openNotification();
      setFormAlreadyOpen(true);
    }
  };

  return (
    <div className="spielbetrieb__link" onClick={handleNewsletterClick}>
      <div>
        <Tooltip title="Newsletter" placement="bottom">
          <NotificationOutlined />
        </Tooltip>
      </div>
    </div>
  );
};

const FormTitle = () => {
  const { t } = useTranslation();
  return <>📣 &nbsp;{t("newsletter.subscribe")}</>;
};

const FormDesc = () => {
  const { t } = useTranslation();
  const email = useRef(null);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [emailAdded, setEmailAdded] = useState(false);
  const handleEmailChange = (e) => {
    email.current = e.target.value;
    setEmailNotValid(false);
  };

  const handleSignUpClick = () => {
    const isEmailValid = validateEmail(email.current);
    if (!isEmailValid) {
      setEmailNotValid(true);
    } else {
      setEmailAdded(true);
    }
  };

  return (
    <>
      {emailAdded ? (
        <div>{t("newsletter.thanksAndConfirm")}</div>
      ) : (
        <>
          {t("newsletter.subscribeDesc")}
          <Space.Compact style={{ width: "100%" }}>
            <Input
              className="newsletter__input"
              defaultValue="email"
              onChange={handleEmailChange}
            />
            <Button
              className="newsletter__button"
              type="primary"
              onClick={handleSignUpClick}
            >
              Sign up
            </Button>
          </Space.Compact>
          {emailNotValid && (
            <div className="newsletter__emailNotValid">
              {t("newsletter.emailNotValid")}
            </div>
          )}
        </>
      )}
    </>
  );
};
