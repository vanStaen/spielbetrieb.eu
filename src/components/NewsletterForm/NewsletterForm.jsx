import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  notification,
  Modal,
  Tooltip,
  Button,
  Input,
  Space,
  Form,
  Radio,
  Select,
} from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { pageStore } from "../../store/pageStore/pageStore";

import "./NewsletterForm.less";
import { addSubscriber } from "./addSubscriber";

export const NewsletterForm = observer(() => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;

  const showModal = () => {
    setOpen(true);
  };

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
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
    setOpen(false);
  };

  const changeLanguageHandler = (e) => {
    pageStore.setSelectedLanguage(e.target.value);
  };

  return (
    <>
      <div className="home__link" onClick={showModal}>
        <div>
          <Tooltip title="Newsletter" placement="bottom">
            <NotificationOutlined />
          </Tooltip>
        </div>
      </div>
      <Modal
        open={open}
        centered
        title={t("newsletter.subscribe")}
        onOk={onFinish}
        onCancel={onCancel}
        footer={null}
      >
        <br />
        <Form
          form={form}
          layout="horizontal"
          size="small"
          onFinish={onFinish}
          name="mewsletter-form"
          initialValues={{
            language: pageStore.selectedLanguage,
            //lists: ["parties", "deals", "extravaganzas"],
            //interests: ["BDSM", "Fetish", "Hedonistic Love", "Queer"],
          }}
        >
          <Form.Item
            label={<div className="newsletter__whiteText">Name</div>}
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: t("newsletter.pleaseInputEmail"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<div className="newsletter__whiteText">Mailing List(s)</div>}
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
              options={[
                { value: "parties", label: "Parties/Events" },
                { value: "deals", label: "Deals" },
                { value: "extravaganzas", label: "Extravaganzas" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<div className="newsletter__whiteText">Interest(s)</div>}
            name="interests"
          >
            <Select
              mode="multiple"
              allowClear
              options={[
                { value: "BDSM", label: "BDSM" },
                { value: "fetish", label: "Fetish" },
                { value: "hedonisticlove", label: "Hedonistic Love" },
                { value: "queer", label: "Queer" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<div className="newsletter__whiteText">Language</div>}
            name="language"
            onChange={changeLanguageHandler}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="de">German</Radio.Button>
              <Radio.Button value="en">English</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {/* 
          <Form.Item
            label={
              <div className="newsletter__whiteText">
                Tell us something about yourself. What is your thing?
              </div>
            }
            name="about"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          */}

          <Form.Item>
            <div className="newsletter__buttonContainer">
              <Button
                className="newsletter__cancelButton"
                htmlType="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="newsletter__submitButton"
                htmlType="submit"
                loading={loading}
              >
                Sign up
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
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
