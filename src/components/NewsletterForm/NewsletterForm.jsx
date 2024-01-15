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

import { validateEmail } from "../../helpers/validateEmail";
import { pageStore } from "../../store/pageStore";

import "./NewsletterForm.less";

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

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
    console.log(values);
  };

  const changeLanguageHandler = (e) => {
    pageStore.setSelectedLanguage(e.target.value);
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
                type: "email",
                required: true,
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<div className="newsletter__whiteText">Mailing List(s)</div>}
            name="lists"
          >
            <Select
              mode="multiple"
              allowClear
              defaultValue={["parties", "deals", "extravaganzas"]}
              options={[
                { value: "parties", label: "Parties/Events" },
                { value: "deals", label: "Deals" },
                { value: "extravaganzas", label: "Extravaganzas" },
              ]}
            />
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
            <Select
              mode="multiple"
              allowClear
              defaultValue={["BDSM", "Fetish", "Hedonistic Love", "Queer"]}
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
            <Radio.Group
              buttonStyle="solid"
              defaultValue={pageStore.selectedLanguage}
            >
              <Radio.Button value="de">German</Radio.Button>
              <Radio.Button value="en">English</Radio.Button>
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
});

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
    <>{emailAdded ? <div>{t("newsletter.thanksAndConfirm")}</div> : <> </>}</>
  );
};
