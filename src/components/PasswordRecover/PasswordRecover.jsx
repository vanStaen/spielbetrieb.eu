import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import { postEmailExist } from "./postEmailExist";
import { postSendRecoverLink } from "./postSendRecoverLink";
import { pageStore } from "../../store/pageStore/pageStore";

import "./PasswordRecover.css";

export const PasswordRecover = observer((props) => {
  const [emailDoNotExist, setEmailDoNotExist] = useState(undefined);
  const { t } = useTranslation();

  const changeEmailHandler = async () => {
    setEmailDoNotExist(undefined);
  };

  const submitHandler = async (values) => {
    const email = values.email;
    const emailExist = await postEmailExist(email);
    if (emailExist === false) {
      setEmailDoNotExist("error");
      notification.error({
        message: t("login.emailDoesNotExist"),
        placement: "bottomRight",
        className: "customNotification",
      });
    } else {
      setEmailDoNotExist("success");
      try {
        await postSendRecoverLink(email);
        notification.open({
          duration: 0,
          message: <TitleRecoverEmailSent />,
          description: <DescRecoverEmailSent />,
          placement: "bottomRight",
          className: "customNotification",
        });
        props.setIsRecovery(false);
      } catch (error) {
        notification.error({
          message: error.message,
          placement: "bottomRight",
          className: "customNotification",
        });
      }
    }
  };

  return (
    <div className="recover__full">
      <div
        className={`recover__header ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
      >
        {t("login.recoverYourPassword")}
      </div>
      <Form
        name="form_recover"
        className="recover__form"
        initialValues={{
          email: props.email,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="email"
          onChange={changeEmailHandler}
          rules={[
            {
              type: "email",
              required: true,
              message: t("login.pleaseInputEmail"),
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`recover__formbutton ${pageStore.selectedTheme === "light" ? "lightColorTheme__Button" : "darkColorTheme__Button"}`}
            disabled={emailDoNotExist === "error"}
          >
            {emailDoNotExist === "error"
              ? t("login.emailDoesNotExist")
              : t("login.sendPasswortResetEmail")}
          </Button>

          <div
            className="recover__iRemember"
            onClick={() => {
              props.setIsRecovery(false);
            }}
          >
            <ArrowLeftOutlined />{" "}
            <span
              className={`link ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
            >
              {t("login.iRememberNow")}
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
});

const TitleRecoverEmailSent = () => {
  const { t } = useTranslation();
  return <>✅ {t("general.youGotMail")}</>;
};

const DescRecoverEmailSent = () => {
  const { t } = useTranslation();
  return <>{t("login.recoverEmailSent")}</>;
};
