import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Checkbox,
  notification,
  Tooltip,
  Row,
  Col,
} from "antd";
import {
  // eslint-disable-next-line no-unused-vars
  CheckOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { postUsernameTaken } from "./postUsernameTaken";
import { postVerifyEmailLink } from "../LoginForm/postVerifyEmailLink";
import { postAddUser } from "./postAddUser";
import { pageStore } from "../../store/pageStore/pageStore";
import { signUpStore } from "./signUpStore";

import "./SignUpForm.css";

dayjs.extend(isSameOrBefore);

const dateFormat = "DD/MM/YYYY";
const dateEighteenYearsAgo = dayjs().subtract(18, "year");
const dateHundredYearsAgo = dayjs().subtract(100, "year");

export const SignUpForm = observer((props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(undefined); // validateStatus: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
  const [isValidBirthday, setIsValidBirthday] = useState(undefined); // validateStatus: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
  const [errorMsgUsername, setErrorMsgUsername] = useState(undefined);
  const [errorMsgBirthday, setErrorMsgBirthday] = useState(undefined);
  const { t } = useTranslation();

  const ageOptions = [];
  for (let i = 1; i < 100; i++) {
    ageOptions.push({
      label: i,
      value: i,
    });
  }

  const changeUserNameHandler = async (e) => {
    const username = e.target.value;
    if (username === "") {
      setIsValidUsername("error");
      setErrorMsgUsername(null);
    } else {
      setIsValidUsername("validating");
      setErrorMsgUsername(null);
      const isUsernameTaken = await postUsernameTaken(username);
      if (isUsernameTaken === true) {
        setIsValidUsername("error");
        setErrorMsgUsername(t("login.usernameIsAlreadyTaken"));
      } else if (isUsernameTaken === false) {
        if (username.includes(" ")) {
          setIsValidUsername("error");
          setErrorMsgUsername(t("login.spacesinUsername"));
        } else {
          setIsValidUsername("success");
          setErrorMsgUsername(null);
        }
      }
    }
  };

  const changeBirthdayHandler = (birthday, dateString) => {
    if (dateString === "") {
      setIsValidBirthday("error");
      setErrorMsgBirthday(t("login.birthdayMissing"));
    } else {
      const isOlderThan18 = birthday.isSameOrBefore(dateEighteenYearsAgo);
      const isOlderThan100 = birthday.isSameOrBefore(dateHundredYearsAgo);
      if (isOlderThan18 === false) {
        setIsValidBirthday("error");
        setErrorMsgBirthday(t("login.mustBeOfLegalAge"));
        console.log(t("login.mustBeOfLegalAge"));
      } else if (isOlderThan100 === true) {
        setIsValidBirthday("error");
        setErrorMsgBirthday(t("login.areYouReallyThatOld"));
      } else {
        setIsValidBirthday("success");
        setErrorMsgBirthday(null);
      }
      setIsValidBirthday("success");
      setErrorMsgBirthday(null);
      signUpStore.setBirthday(birthday);
    }
  };

  const submitHandler = async (values) => {
    setIsLoading(true);
    const firstname = values.firstname;
    const lastname = values.lastname;
    const username = values.username;
    const email = values.email;
    const password = values.password;
    const birthday = values.birthday.valueOf();
    try {
      const response = await postAddUser(
        firstname,
        lastname,
        username,
        email,
        password,
        birthday,
        pageStore.selectedLanguage,
      );
      if (!response.errors) {
        await postVerifyEmailLink(email);
        notification.open({
          message: <ErrorTitleNotVerified />,
          description: <ErrorDescNotVerified />,
          placement: "bottomRight",
          className: "customNotification",
          duration: 0,
        });
        props.setShowLogin(true);
      } else {
        notification.open({
          message: <>❌ {response.errors[0].message}</>,
          placement: "bottomRight",
          className: "customNotification",
        });
      }
    } catch (error) {
      notification.open({
        message: <>❌ {error.message}</>,
        placement: "bottomRight",
        className: "customNotification",
      });
      console.log(error);
    }
    signUpStore.resetAll();
    setIsLoading(false);
  };

  return (
    <div className="signup__full">
      <div
        className={`signup__header ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
      >
        {t("login.signinto")} <b>merrier</b>
        .app {t("login.signintoAfter")}
      </div>

      <Form
        name="form_signup"
        className="signup__form"
        initialValues={{
          code: props.inviteCode,
          firstname: signUpStore.firstname,
          lastname: signUpStore.lastname,
          birthday: signUpStore.birthday && dayjs(signUpStore.birthday),
          username: signUpStore.username,
          email: signUpStore.email,
        }}
        onFinish={submitHandler}
      >
        {/*
        <Tooltip
          trigger={['hover']}
          title={t('login.yourInvitationCode')}
          placement="left"
        >
          <Form.Item
            name="code"
            className="signup__code"
            rules={[
              {
                required: true,
                message: t('login.invitationRequiredCreateAccount')
              }
            ]}
          >
            <Input
              prefix={<CheckOutlined className="site-form-item-icon" />}
              placeholder={t('login.invitationCode')}
              disabled={props.inviteCode}
            />
          </Form.Item>
          </Tooltip>
        */}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstname"
              rules={[
                {
                  required: true,
                  message: t("login.firstNameMissing"),
                },
              ]}
            >
              <Input
                placeholder={t("login.firstName")}
                onChange={(e) => {
                  signUpStore.setFirstname(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  message: t("login.lastNameMissing"),
                },
              ]}
            >
              <Input
                placeholder={t("login.lastName")}
                onChange={(e) => {
                  signUpStore.setLastname(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="birthday"
              validateStatus={isValidBirthday}
              rules={[
                {
                  required: true,
                  message: t("login.birthdayMissing"),
                },
                {
                  validator(_, value) {
                    if (value && isValidBirthday === "error") {
                      return Promise.reject(new Error(errorMsgBirthday));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker
                onChange={changeBirthdayHandler}
                className="signup__datePicker"
                format={{
                  format: dateFormat,
                  type: "mask",
                }}
                placeholder={t("login.birthday")}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Tooltip
              trigger={["hover"]}
              title={
                errorMsgUsername
                  ? errorMsgUsername === t("login.usernameIsAlreadyTaken")
                    ? t("login.alreadyTaken")
                    : t("login.doNotUseSpaces")
                  : null
              }
              placement="left"
            >
              <Form.Item
                name="username"
                className="signup__username"
                validateStatus={isValidUsername}
                onChange={changeUserNameHandler}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t("login.howShouldWeCallYou"),
                  },
                  {
                    validator(_, value) {
                      if (value && isValidUsername === "error") {
                        return Promise.reject(new Error(errorMsgUsername));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t("login.pickUsername")}
                  onChange={(e) => {
                    signUpStore.setUsername(e.target.value);
                  }}
                />
              </Form.Item>
            </Tooltip>
          </Col>
        </Row>

        <Form.Item
          name="email"
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
            onChange={(e) => {
              signUpStore.setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("login.pleaseInputYourPassword"),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.choosePassword")}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("login.pleaseConfirmYourPassword"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("login.passwordsDoNotMatch")),
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.confirmYourPassword")}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: t("login.pleaseAcceptTerms"),
            },
          ]}
        >
          <Checkbox
            className={`signup__terms ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
          >
            {t("login.creatingAccountMeans")}{" "}
            <a className="link" href="/service">
              {t("login.termsService")}
            </a>
            ,{" "}
            <a className="link" href="/privacy">
              {t("login.privacyPolicy")}
            </a>
            {t("login.andDefault")}{" "}
            <a className="link" href="/settings">
              {t("login.notificationSettings")}
            </a>
            {t("login.creatingAccountMeansAfter")}
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`signup__formbutton ${pageStore.selectedTheme === "light" ? "lightColorTheme__Button" : "darkColorTheme__Button"}`}
          >
            {isLoading ? <SyncOutlined spin /> : t("login.createAccount")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

const ErrorTitleNotVerified = () => {
  const { t } = useTranslation();
  return <>{t("login.pleaseConfirmEmail")}</>;
};

const ErrorDescNotVerified = () => {
  const { t } = useTranslation();
  return <>{t("login.pleaseConfirmEmail2")}</>;
};
