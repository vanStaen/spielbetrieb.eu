import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { notification, Button, Input, Form, Radio, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  MailOutlined,
  UserOutlined,
  UnorderedListOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { pageStore } from "../../store/pageStore/pageStore";
import { addSubscriber } from "./addSubscriber";

import "./NewsletterForm.less";

export const NewsletterForm = observer(() => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCancel = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await addSubscriber(values);
      if (result.status === 500) {
        notification.open({
          message: <ErrorNotifTitle />,
          description: <ErrorNotifDesc errorMessage={result.message} />,
          duration: 0,
          placement: "bottomRight",
          className: "customNotification",
        });
      } else {
        notification.open({
          message: <SuccesNotifTitle />,
          description: <SuccesNotifDesc />,
          duration: 0,
          placement: "bottomRight",
          className: "customNotification",
        });
      }
    } catch (e) {
      notification.open({
        message: <ErrorNotifTitle />,
        description: <ErrorNotifDesc errorMessage={e.toString()} />,
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
    setLoading(false);
    navigate("/");
  };

  const changeLanguageHandler = (e) => {
    pageStore.setSelectedLanguage(e.target.value);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      name="newsletter-form"
      initialValues={{
        language: pageStore.selectedLanguage,
        // lists: ["parties", "deals", "extravaganzas"],
        // interests: ["BDSM", "Fetish", "Hedonistic Love", "Queer"],
      }}
    >
      <Form.Item
        name="username"
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("newsletter.name")}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            required: true,
            message: t("newsletter.pleaseInputEmail"),
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder={t("newsletter.email")}
        />
      </Form.Item>
      <Form.Item
        name="language"
        onChange={changeLanguageHandler}
        className='newsletter__radioContainer'
      >
        <Radio.Group
          buttonStyle="solid"
          size="small"
        >
          <Radio.Button value="de">{t("newsletter.german")}</Radio.Button>
          <Radio.Button value="en">{t("newsletter.english")}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="lists"
        rules={[
          {
            required: true,
            message: t("newsletter.pleaseSelectList"),
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder={t("newsletter.lists")}
          suffixIcon={<UnorderedListOutlined className="site-form-item-icon" />}
          options={[
            { value: "parties", label: t("newsletter.parties") },
            { value: "deals", label: t("newsletter.deals") },
            { value: "extravaganzas", label: t("newsletter.extravaganzas") },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="interests"
      >
        <Select
          mode="multiple"
          allowClear
          placeholder={t("newsletter.interests")}
          suffixIcon={<HeartOutlined className="site-form-item-icon" />}
          options={[
            { value: "BDSM", label: "BDSM" },
            {
              value: "fetish",
              label: t("scene.fetish"),
            },
            { value: "hedonisticlove", label: t("scene.hedonisticLove") },
            { value: "queer", label: "Queer" },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <div className="newsletter__buttonContainer">
          <Button
            className="newsletter__cancelButton"
            htmlType="button"
            onClick={onCancel}
          >
            {t("newsletter.reset")}
          </Button>
          <Button
            className={`newsletter__submitButton ${pageStore.selectedTheme === "light" ? "lightColorTheme__Button" : "darkColorTheme__Button"}`}
            htmlType="submit"
            loading={loading}
          >
            {t("newsletter.signup")}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});

const SuccesNotifTitle = () => {
  const { t } = useTranslation();
  return <div>{`📣 ${t("newsletter.subscribe")}`}</div>;
};

const ErrorNotifTitle = () => {
  const { t } = useTranslation();
  return <div>{`❌ ${t("newsletter.error")}`}</div>;
};

const SuccesNotifDesc = () => {
  const { t } = useTranslation();
  return <div>{t("newsletter.thanksAndConfirm")}</div>;
};

const ErrorNotifDesc = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <i>
          <b>{props.errorMessage}</b>
        </i>
      </div>
      <div>{t("newsletter.verificationError")}</div>
    </>
  );
};
