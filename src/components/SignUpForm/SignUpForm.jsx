import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import * as dayjs from "dayjs";
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Checkbox,
  notification,
  Tooltip
} from 'antd';
import {
  CheckOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SyncOutlined
} from '@ant-design/icons';

import { postUsernameTaken } from './postUsernameTaken';
import { postVerifyEmailLink } from '../LoginForm/postVerifyEmailLink';
import { postAddUser } from './postAddUser';
import { pageStore } from '../../store/pageStore/pageStore';

import './SignUpForm.css';

dayjs.extend(isSameOrBefore);
const dateFormat = 'DD/MM/YYYY';
const dateEighteenYearsAgo = dayjs().subtract(18, 'year') ;
const dateHundredYearsAgo = dayjs().subtract(100, 'year') ;

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
      value: i
    });
  }

  const changeUserNameHandler = async (e) => {
    const username = e.target.value;
    if (username === '') {
      setIsValidUsername('error');
      setErrorMsgUsername(null);
    } else {
      setIsValidUsername('validating');
      setErrorMsgUsername(null);
      const isUsernameTaken = await postUsernameTaken(username);
      if (isUsernameTaken === true) {
        setIsValidUsername('error');
        setErrorMsgUsername(t('login.usernameIsAlreadyTaken'));
      } else if (isUsernameTaken === false) {
        if (username.includes(' ')) {
          setIsValidUsername('error');
          setErrorMsgUsername(t('login.spacesinUsername'));
        } else {
          setIsValidUsername('success');
          setErrorMsgUsername(null);
        }
      }
    }
  };

  const changeBirthdayHandler =  (birthday, dateString) => {
    if (dateString === '') {
      setIsValidBirthday('error');
      setErrorMsgBirthday(t("login.birthdayMissing"));
    } else {
      const isOlderThan18 = birthday.isSameOrBefore(dateEighteenYearsAgo);
      const isOlderThan100 = birthday.isSameOrBefore(dateHundredYearsAgo);
      if (isOlderThan18 === false) {
        setIsValidBirthday('error');
        setErrorMsgBirthday(t('login.mustBeOfLegalAge'));
        console.log(t('login.mustBeOfLegalAge'));
      } else if (isOlderThan100 === true) {
        setIsValidBirthday('error');
        setErrorMsgBirthday(t('login.areYouReallyThatOld'));
        console.log(t('login.areYouReallyThatOld'));
      } else {
        setIsValidBirthday('success');
        setErrorMsgBirthday(null);
      }
    }
  };

  const submitHandler = async (values) => {
    setIsLoading(true);
    const firstname = values.firstname;
    const lastname = values.lastname;
    const username = values.username;
    const email = values.email;
    const password = values.password;
    try {
      const response = await postAddUser(
        firstname,
        lastname,
        username,
        email,
        password
      );
      if (!response.errors) {
        await postVerifyEmailLink(email);
        notification.warning({
          message: <ErrorTitleNotVerified />,
          description: <ErrorDescNotVerified />,
          placement: 'bottomRight',
          className: 'customNotification',
          duration: 0
        });
        props.setShowLogin(true);
      } else {
        notification.open({
          message: <>❌ {response.errors[0].message}</>,
          placement: 'bottomRight',
          className: 'customNotification'
        });
      }
    } catch (error) {
      notification.open({
        message: <>❌ {error.message}</>,
        placement: 'bottomRight',
        className: 'customNotification'
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="signup__full">
      <div className={`signup__header ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`}>
        {t('login.signinto')} <b>merrier</b>
        .app {t('login.signintoAfter')}
      </div>

      <Form
        name="form_signup"
        className="signup__form"
        initialValues={{
          code: props.inviteCode
        }}
        onFinish={submitHandler}
      >
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

        <Form.Item
          name="firstname"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          rules={[
            {
              required: true,
              message: t('login.firstNameMissing')
            }
          ]}
        >
          <Input
            placeholder={t('login.firstName')}
          />
        </Form.Item>
        <span
          style={{
            display: 'inline-block',
            width: '24px',
            lineHeight: '32px',
            textAlign: 'center'
          }}
        ></span>
        <Form.Item
          name="lastname"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          rules={[
            {
              required: true,
              message: t('login.lastNameMissing')
            }
          ]}
        >
          <Input
            placeholder={t('login.lastName')}
          />
        </Form.Item>

        <Form.Item
          name="birthday"
          validateStatus={isValidBirthday}
          style={{ display: 'inline-block' }}
          rules={[
            {
              required: true,
              message: t('login.birthdayMissing')
            },
            {
              validator (_, value) {
                if (value && isValidBirthday === 'error') {
                  return Promise.reject(new Error(errorMsgBirthday));
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <DatePicker 
            onChange={changeBirthdayHandler}
            //defaultValue={dateEighteenYearsAgo}
            placeholder={t('login.birthday')} 
            format={dateFormat}
          />
        </Form.Item>
        <span className="signup__spacerBirthday"
        ></span>
        <Tooltip
          trigger={['hover']}
          title={
            errorMsgUsername
              ? errorMsgUsername === t('login.usernameIsAlreadyTaken')
                ? t('login.alreadyTaken')
                : t('login.doNotUseSpaces')
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
                message: t('login.howShouldWeCallYou')
              },
              {
                validator (_, value) {
                  if (value && isValidUsername === 'error') {
                    return Promise.reject(new Error(errorMsgUsername));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t('login.pickUsername')}
            />
          </Form.Item>
        </Tooltip>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: t('login.pleaseInputEmail')
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('login.pleaseInputYourPassword')
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t('login.choosePassword')}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: t('login.pleaseConfirmYourPassword')
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t('login.passwordsDoNotMatch'))
                );
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t('login.confirmYourPassword')}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: t('login.pleaseAcceptTerms')
            }
          ]}
        >
          <Checkbox className={`signup__terms ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`}>
            {t('login.creatingAccountMeans')}{' '}
            <a className="link" href="/service">{t('login.termsService')}</a>,{' '}
            <a className="link" href="/privacy">{t('login.privacyPolicy')}</a>
            {t('login.andDefault')}{' '}
            <a className="link" href="/settings">{t('login.notificationSettings')}</a>
            {t('login.creatingAccountMeansAfter')}
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`signup__formbutton ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__Button' : 'darkColorTheme__Button'}`}
          >
            {isLoading ? <SyncOutlined spin /> : t('login.createAccount')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

const ErrorTitleNotVerified = () => {
  const { t } = useTranslation();
  return <>{t('login.pleaseConfirmEmail')}</>;
};

const ErrorDescNotVerified = () => {
  const { t } = useTranslation();
  return <>{t('login.pleaseConfirmEmail2')}</>;
};
