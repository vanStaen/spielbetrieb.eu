import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Badge, Spin } from 'antd'
import { observer } from 'mobx-react'
import {
  LockOutlined,
  UnlockOutlined,
  SettingOutlined,
  UserOutlined,
  ReconciliationOutlined,
  HeartOutlined,
  LoadingOutlined
} from '@ant-design/icons'

import { adminStore } from '../../store/adminStore/adminStore'
import { authStore } from '../../store/authStore/authStore'
import { pageStore } from '../../store/pageStore'

import './UserMenu.css'

export const UserMenu = observer(() => {
  const [showOpenLock, setShowOpenLock] = useState(false)

  const handleClickLogOut = () => {
    authStore.logout()
    setTimeout(function () {
      window.location.reload()
    }, 500)
  }

  useEffect(() => {
    if (pageStore.showMenu) {
      const elementBackground = document.getElementById('silentBackground')
      const elementContainer = document.getElementById('menuContainer')
      elementBackground.style.backdropFilter = 'blur(7px) grayscale(25%)'
      elementContainer.style.opacity = 1
    }
  })

  const handleHideMenu = () => {
    const elementBackground = document.getElementById('silentBackground')
    const elementContainer = document.getElementById('menuContainer')
    elementBackground.style.backdropFilter = 'blur(0px) grayscale(0%)'
    elementContainer.style.opacity = 0
    setTimeout(function () {
      pageStore.setShowMenu(false)
    }, 300)
  }

  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'goldenrod' }} spin />
  )

  return (
    <>
    <div className="menu__profile">
       <span
            onClick={() => pageStore.setShowMenu(!pageStore.showMenu)}
            className="link"
          >
            <Badge count={adminStore.isLoading ? 0 : 0} offset={[0, 5]}>
              <Avatar
                src={
                  adminStore.isLoading
                    ? null
                    : adminStore.avatar
                      ? adminStore.avatar
                      : <LockOutlined/>
                }
                icon={adminStore.isLoading && <Spin indicator={spinIcon} />}
                className="menu__avatar"
                size={50}
              />
            </Badge>
          </span>
        </div>

      <div
        className="menu__silentBackground"
        id="silentBackground"
        onClick={handleHideMenu}
      ></div>
      <div
        onMouseLeave={handleHideMenu}
        className="menu__Container"
        id="menuContainer"
      >
        <div
          className="link menu__element"
          onClick={() => pageStore.setShowMenu(true)}
        >
          <HeartOutlined style={{ position: 'relative', bottom: '-2px' }} />
          &nbsp; Favorites
        </div>
        <div className="menu__elementDisabled">
          <UserOutlined style={{ position: 'relative', bottom: '-2px' }} />
          &nbsp; Profile
        </div>
        <div className="menu__elementDisabled">
          <SettingOutlined style={{ position: 'relative', bottom: '-2px' }} />
          &nbsp; Settings
        </div>

        <div className="menu__whiteline"></div>
        <div
          className="link menu__element"
          onMouseEnter={() => setShowOpenLock(true)}
          onMouseLeave={() => setShowOpenLock(false)}
          onClick={handleClickLogOut}
        >
          {showOpenLock
            ? (
            <UnlockOutlined style={{ position: 'relative', bottom: '-2px' }} />
              )
            : (
            <LockOutlined style={{ position: 'relative', bottom: '-2px' }} />
              )}
          &nbsp; Logout
        </div>

        {adminStore.isAdmin && (
          <>
            <div className="menu__whiteline"></div>
            <div className="link menu__element">
              <Link className="link menu__link" to="/admin/">
                <ReconciliationOutlined
                  style={{ position: 'relative', bottom: '-2px' }}
                />
                &nbsp; Admin
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
})
