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
} from "antd";
import { NotificationOutlined } from "@ant-design/icons";

import { validateEmail } from "../../helpers/validateEmail";

import "./NewsletterForm.less";

export const NewsletterForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;

  const showModal = () => {
    setOpen(true);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
    console.log(values);
  };

  const handleNewsletterClick = () => {
    /* if (!formAlreadyOpen) {
      openNotification();
      setFormAlreadyOpen(true);
    } */
    hideModal();
  };

  const handleValidateForm = () => {
    /* const openNotification = () => {
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
    }; */
  };

  return (
    <>
      <div className="spielbetrieb__link" onClick={showModal}>
        <div>
          <Tooltip title="Newsletter" placement="bottom">
            <NotificationOutlined />
          </Tooltip>
        </div>
      </div>
      <Modal
        open={open}
        centered
        title={`📣 ${t("newsletter.subscribe")}`}
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
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mailing List(s)"
            name="lists"
            rules={[
              {
                required: true,
                message: "Pick at least one mailing list!",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="parties">Parties/Events</Radio.Button>
              <Radio.Button value="deals">Specials Deals</Radio.Button>
              <Radio.Button value="extravaganzas">Extravaganzas</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Language"
            name="language"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="de">German</Radio.Button>
              <Radio.Button value="en">English</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={<div className="newsletter__whiteText">Interest(s)</div>}
            name="Interests"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="BDSM">BDSM</Radio.Button>
              <Radio.Button value="Fetish">Fetish</Radio.Button>
              <Radio.Button value="Hedonistic Love">
                Hedonistic Love
              </Radio.Button>
              <Radio.Button value="Queer">Queer</Radio.Button>
            </Radio.Group>
          </Form.Item>
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
