import React, { useState, useRef } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import {
  MailOutlined,
  LockOutlined,
  SyncOutlined,
  LinkOutlined
} from '@ant-design/icons';

import { PasswordRecover } from '../PasswordRecover/PasswordRecover';
import { authStore } from '../../store/authStore/authStore';
import { pageStore } from '../../store/pageStore/pageStore';
import { postVerifyEmailLink } from './postVerifyEmailLink';
import { validateEmail } from '../../helpers/validateEmail';

import './LoginForm.css';

export const LoginForm = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const isEmail = useRef(undefined);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setIsLoading(true);
    const emailOrUsername = values.emailOrUsername;
    const isValidEmail = validateEmail(emailOrUsername);
    if (isValidEmail) {
      isEmail.current = values.emailOrUsername.toLowerCase();
    }
    const password = values.password;
    const remember = values.remember;
    try {
      let error = null;
      if (isValidEmail) {
        error = await authStore.login(
          emailOrUsername,
          null,
          password,
          remember
        );
      } else {
        error = await authStore.login(
          null,
          emailOrUsername,
          password,
          remember
        );
      }
      if (error) {
        if (error === 'Error: Email is not verified!') {
          notification.open({
            duration: 0,
            message: <ErrorTitleNotVerified />,
            description: <ErrorDescNotVerified emailOrUsername={emailOrUsername} />,
            placement: 'bottomRight',
            className: 'customNotification'
          });
        } else if (error === 'Error: Password is incorrect!') {
          notification.open({
            duration: 5,
            message: <ErrorTitlePwdIncorrect />,
            description: (
              <ErrorDescPwdIncorrect setIsRecovery={setIsRecovery} />
            ),
            placement: 'bottomRight',
            className: 'customNotification'
          });
        } else {
          notification.error({
            message: error,
            placement: 'bottomRight',
            className: 'customNotification'
          });
        }
      } else {
        // Go back to main page
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return isRecovery
    ? (
    <PasswordRecover setIsRecovery={setIsRecovery} email={isEmail.current} />
      )
    : (
      <div className="login__full">
        <div className={`login__header ${pageStore.selectedTheme === "light" ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`}>
          {t('login.loginto')} <b>Spielbetrieb</b>
          .eu {t('login.logintoAfter')}
        </div>
        <Form
          name="form_login"
          className="login__form"
          initialValues={{
            email: isEmail.current
          }}
          onFinish={submitHandler}
        >
          <Form.Item
            name="emailOrUsername"
            rules={[
              {
                required: true,
                message: t('login.pleaseInputEmailOrUsername')
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={t('login.emailOrUsername')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('login.pleaseInputPassword')
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={t('login.password')}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ display: 'inline-block', width: 'calc(50%)' }}
            defaultChecked={false}
          >
            <Checkbox className={`login__remember ${pageStore.selectedTheme === "light" ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`}>
              {t('login.rememberMe')}
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="passwordRecover"
            style={{
              display: 'inline-block',
              width: 'calc(50%)',
              textAlign: 'right'
            }}
          >
            <span className={`link ${pageStore.selectedTheme === "light" ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`} onClick={() => setIsRecovery(!isRecovery)}>
              {t('login.recoverPassword').replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={`login__formbutton ${pageStore.selectedTheme === "light" ?  'lightColorTheme__Button' : 'darkColorTheme__Button'}`}
            >
              {isLoading ? <SyncOutlined spin /> : t('login.logMeIn')}
            </Button>
          </Form.Item>
        </Form>
      </div>
      );
});

const ErrorTitleNotVerified = () => {
  const { t } = useTranslation();
  return <>❌ {t('login.emailNotVerifyYet')}!</>;
};

const ErrorDescNotVerified = (props) => {
  const { t } = useTranslation();

  return (
    <div
      className="justify"
      onClick={() => {
        postVerifyEmailLink(props.emailOrUsername);
        notification.success({
          duration: 0,
          message: t('login.recoverEmailSent'),
          placement: 'bottomRight',
          className: 'customNotification'
        });
      }}
    >
      {t('login.checkPostBoxForVerificationLink')}
      {': '}
      <span className="link">
        <LinkOutlined /> {t('login.clickToGetNewVerificationLink')}{' '}
        {t('login.verifyYourEmail')}
      </span>
      .
    </div>
  );
};

const ErrorTitlePwdIncorrect = () => {
  const { t } = useTranslation();
  return <>❌ {t('login.passwordIsIncorrect')}!</>;
};

const ErrorDescPwdIncorrect = (props) => {
  const { t } = useTranslation();
  return (
    <div className="justify">
      {t('login.pleaseCheckPasswordOrUse')}{' '}
      <span className="link" onClick={() => props.setIsRecovery(true)}>
        {t('login.recoverPassword')}
      </span>{' '}
      {t('login.feature')}.
    </div>
  );
};
