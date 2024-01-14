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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewsletterClick = () => {
    /* if (!formAlreadyOpen) {
      openNotification();
      setFormAlreadyOpen(true);
    } */
    setIsModalOpen(true);
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
    <div className="spielbetrieb__link" onClick={handleNewsletterClick}>
      <div>
        <Tooltip title="Newsletter" placement="bottom">
          <NotificationOutlined />
        </Tooltip>
      </div>
      {isModalOpen && (
        <Modal
          title={`📣 ${t("newsletter.subscribe")}`}
          open={isModalOpen}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button key="Submit" onClick={() => setIsModalOpen(false)}>
              Sign up
            </Button>,
          ]}
        >
          <br />
          <Form form={form} layout="vertical" size="small">
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
              label="Mainlig List(s)"
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
              label="Interest(s)"
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
              label="Tell us something about yourself. What is your thing?"
              name="about"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
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
