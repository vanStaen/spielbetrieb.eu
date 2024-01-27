import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Segmented } from 'antd';
import { observer } from 'mobx-react';
import {
  PieChartOutlined,
  ReadOutlined,
  ShopOutlined,
  UserOutlined,
  CalendarOutlined,
  PicLeftOutlined,
  FontSizeOutlined
} from '@ant-design/icons';

import SpielbetriebLogo from '../../img/logos/spielbetriebLogo.png';
import { AdminNewsletter } from './AdminNewsletter/AdminNewsletter';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { isMobileCheck } from '../../helpers/checkMobileTablet';
import { authStore } from '../../store/authStore/authStore';
import { userStore } from '../../store/userStore/userStore';
import { adminStore } from '../../store/adminStore/adminStore';

import './Admin.less';

export const Admin = observer(() => {
  const segmentedChangeHandler = (e) => {
    adminStore.setSelectedPage(e);
  };

  useEffect(() => {
    if (!adminStore.selectedPage && userStore.adminRoles) {
      adminStore.setSelectedPage(userStore.adminRoles[0]);
    }
  }, [userStore.adminRoles]);

  const isMobile = isMobileCheck();

  const renderSwitch = (adminPage) => {
    switch (adminPage) {
      case 'newsletter':
        return <AdminNewsletter />;
      case 'events':
        return 'events';
      case 'users':
        return 'users';
      case 'shops':
        return 'shops';
      case 'blog':
        return 'blog';
      case 'analytics':
        return 'analytics';
      case 'translation':
        return 'translation';
      default:
        return 'Error';
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="admin__container">
        {!isMobile &&
        <Link to="../" relative="path">
          <Tooltip title="Back to main page" placement="left">
            <img
              src={SpielbetriebLogo}
              id="spielbetriebLogo"
              className="admin__logo"
            />
          </Tooltip>
        </Link>}
        {userStore.isAdmin
          ? (
          <div className="admin__sectionContainer">
            <Segmented
              size={isMobile && 'large'}
              style={{ position: 'relative', zIndex: '10' }}
              onChange={segmentedChangeHandler}
              value={adminStore.selectedPage}
              options={[
                {
                  label: !isMobile && 'Newsletter',
                  value: 'newsletter',
                  disabled: !userStore.adminRoles?.includes('newsletter'),
                  icon: <PicLeftOutlined />
                },
                {
                  label: !isMobile && 'Events',
                  value: 'events',
                  disabled: !userStore.adminRoles?.includes('events'),
                  icon: <CalendarOutlined />
                },
                {
                  label: !isMobile && 'Users',
                  value: 'users',
                  disabled: !userStore.adminRoles?.includes('users'),
                  icon: <UserOutlined />
                },
                {
                  label: !isMobile && 'Shops',
                  value: 'shops',
                  disabled: !userStore.adminRoles?.includes('shops'),
                  icon: <ShopOutlined />
                },
                {
                  label: !isMobile && 'Blog',
                  value: 'blog',
                  disabled: !userStore.adminRoles?.includes('blog'),
                  icon: <ReadOutlined />
                },
                {
                  label: !isMobile && 'Analytics',
                  value: 'analytics',
                  disabled: !userStore.adminRoles?.includes('analytics'),
                  icon: <PieChartOutlined />
                },
                {
                  label: !isMobile && 'Translations',
                  value: 'translation',
                  disabled: !userStore.adminRoles?.includes('translation'),
                  icon: <FontSizeOutlined />
                }
              ]}
            />
            <div className="admin__title">
              {renderSwitch(adminStore.selectedPage)}
            </div>
          </div>
            )
          : (
          <div className="admin__centered">
            {authStore.hasAccess
              ? (
              <div className="admin__title">You dont have admin rights</div>
                )
              : (
              <LoginForm />
                )}
          </div>
            )}
      </div>
    </>
  );
});
