/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { Tooltip } from 'antd'

import { postEmailVerified } from './postEmailVerified'
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown'
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown'
import { CustomSpinner } from '../../components/CustomSpinner/CustomSpinnner'
import SpielbetriebLogo from '../../img/logos/spielbetriebLogo.png'

import './EmailVerified.less'

export const EmailVerified = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const { t } = useTranslation()
  const params = useParams()

  const emailIsVerified = useCallback(async () => {
    const success = await postEmailVerified(params.token)
    if (success) {
      setIsVerified(true)
      setTimeout(() => {
        document.location.href = '/'
      }, 5000)
    }
    setIsLoading(false)
  }, [params.verifyCode])

  useEffect(() => {
    emailIsVerified()
  }, [emailIsVerified])

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
          <div className="subscriberVerifyEmail__text">
            {isVerified
              ? (<div className="verifyEmail__text">
              <strong>{t('login.emailVerified')}</strong> <br />
              {t('login.welcomeInOurCommunity')}!<br />
              {t('login.goAheadAndLogin')}.
              <br />
              <br />
              <div>
                {t('login.redirectedToThe')}{' '}
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = '/'
                  }}
                >
                  {' '}
                  {t('login.loginPage')}
                </span>
                .
              </div>
            </div>)
              : (<div className="verifyEmail__text">
              <strong>{t('login.emailNotVerified')}!</strong>
              <br />
              <br />
              {t('login.somethingWrongEmail')}!
              <br />
              <div>
                {t('login.whatCanYouDo')}
                  {' '}
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = '/'
                  }}
                >
                  {t('login.loginPage')}
                </span>
                {', '}
                {t('login.requestNewLink')}.
              </div>
            </div>)}
          </div>
          <Tooltip title={t('general.backTomainScreen')} placement="bottom">
            <Link to="../../" relative="path">
              <img
                src={SpielbetriebLogo}
                id="spielbetriebLogo"
                className="verifyEmail__logo"
              />
            </Link>
          </Tooltip>
        </>
          )}
    </div>
    </>
  )
}
