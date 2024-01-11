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
      message: <> 📣 &nbsp;{t("newsletter.subscribe")}</>,
      description: <Form />,
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

export const Form = () => {
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
        <div>Thank you! Please confirm your email and you are in.</div>
      ) : (
        <>
          Sign up to be first to know about Spielbetrieb & Merrier latest news:
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
              This email is not valid, please check it.
            </div>
          )}
        </>
      )}
    </>
  );
};
