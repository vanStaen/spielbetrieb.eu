import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { LockOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { postTokenVerify } from './postTokenVerify';
import { postChangePassword } from './postChangePassword';
import { CustomSpinner } from '../../components/CustomSpinner/CustomSpinnner';
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';

import './NewPassword.less';

export const NewPassword = () => {
  const [wrongTokenNotifWasShown, setWrongTokenNotifWasShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { t } = useTranslation();
  const params = useParams();

  const token = params.token;

  const submitHandler = async (value) => {
    setIsLoading(true);
    const password = value.password;
    try {
      const success = await postChangePassword(token, password);
      if (success === true) {
        notification.open({
          duration: 3,
          message: <ErrorTitlePwdReseted />,
          description: <ErrorDescPwdReseted />,
          placement: 'bottomRight',
          className: 'customNotification'
        });
        setTimeout(() => {
          document.location.href = '/login';
        }, 3000);
      } else {
        notification.open({
          duration: 10,
          message: <ErrorTitlePwdNotChanged />,
          description: <ErrorDescPwdNotChanged />,
          placement: 'bottomRight',
          className: 'customNotification'
        });
      }
    } catch (error) {
      notification.error({
        duration: 10,
        message: error.message,
        placement: 'bottomRight',
        className: 'customNotification'
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  const verifyToken = useCallback(async () => {
    setIsLoading(true);
    const tokenValid = await postTokenVerify(token);
    if (!tokenValid) {
      if (wrongTokenNotifWasShown) {
        return;
      }
      setIsValid(false);
      notification.open({
        duration: 0,
        message: <ErrorTitleLinkNotValid />,
        description: <ErrorDescLinkNotValid />,
        placement: 'bottomRight',
        className: 'customNotification'
      });
      setWrongTokenNotifWasShown(true);
    }
    setIsLoading(false);
  }, [token, t]);

  useEffect(() => {
    if (!wrongTokenNotifWasShown) {
      verifyToken();
    }
  }, [wrongTokenNotifWasShown]);

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <div className="background invertColorTheme" id="background"></div>
      <div className="verifyEmail__container invertColorTheme">
        {isLoading
          ? (
          <CustomSpinner size="large" text="Validating" />
            )
          : (
          <>
            <div className="verifyEmail__header">
              {t('login.setNewPassword')}
            </div>
            <Form
              name="form_signup"
              className="verifyEmail__form"
              initialValues={{
                remember: true
              }}
              onFinish={submitHandler}
            >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('login.pleaseInputNewPassword')
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('login.chooseNewPassword')}
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t('login.pleaseInputNewPassword')
                  },
                  ({ getFieldValue }) => ({
                    validator (_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t('login.passwordDoNotMatch'))
                      );
                    }
                  })
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('login.pleaseConfirmNewPassword')}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="verifyEmail__formbutton"
                  disabled={!isValid}
                >
                  {isLoading
                    ? (
                    <SyncOutlined spin />
                      )
                    : isValid
                      ? (
                          t('login.updatePassword')
                        )
                      : (
                          t('login.linkNotValidAnymore')
                        )}
                </Button>
              </Form.Item>
            </Form>
          </>
            )}
      </div>
    </>
  );
};

const ErrorTitleLinkNotValid = () => {
  const { t } = useTranslation();
  return <>❌ {t('login.linkNotValid')}</>;
};

const ErrorDescLinkNotValid = () => {
  const { t } = useTranslation();
  return <>{t('login.linkNotValid2')}</>;
};

const ErrorTitlePwdNotChanged = () => {
  const { t } = useTranslation();
  return <>❌ {t('login.passwordNotChanged')}</>;
};

const ErrorDescPwdNotChanged = () => {
  const { t } = useTranslation();
  return <>{t('login.passwordNotChanged2')}</>;
};

const ErrorTitlePwdReseted = () => {
  const { t } = useTranslation();
  return <>👌 {t('login.passwordReseted')}</>;
};

const ErrorDescPwdReseted = () => {
  const { t } = useTranslation();
  return <>{t('login.passwordReseted2')}</>;
};
