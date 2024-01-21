import React from 'react';
import { Link } from "react-router-dom";
import { Tooltip, Segmented } from "antd";
import { observer } from "mobx-react";
import {
    PieChartOutlined,
    ReadOutlined,
    ShopOutlined,
    UserOutlined,
    CalendarOutlined,
    PicLeftOutlined
} from '@ant-design/icons';

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { AdminNewsletter } from "./AdminNewsletter/AdminNewsletter";
import { adminStore } from "../../store/adminStore";
import { PinInput } from './PinInput/PinInput';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { isMobileCheck } from '../../helpers/checkMobileTablet';

import './Admin.less';
import { authStore } from '../../store/authStore/authStore';

export const Admin = observer(() => {

    const segmentedChangeHandler = (e) => {
        adminStore.setSelectedPage(e);
    }

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
            default:
                return 'Error';
        }
    }

    return (
        <>
            <div className='background'></div>
            <div className='admin__container'>
                <Link to="../" relative="path">
                    <Tooltip title="Back to main page" placement="left">
                        <img
                            src={SpielbetriebLogo}
                            id="spielbetriebLogo"
                            className="admin__logo"
                        />
                    </Tooltip>
                </Link>

                {authStore.hasAccess ?
                    <div className='admin__sectionContainer'>
                        <Segmented
                            size={isMobile && 'large'}
                            style={{ position: 'relative', zIndex: '10' }}
                            onChange={segmentedChangeHandler}
                            options={
                                [
                                    {
                                        label: !isMobile && 'Newsletter',
                                        value: 'newsletter',
                                        disabled: false,
                                        icon: <PicLeftOutlined />,
                                    },
                                    {
                                        label: !isMobile && 'Events',
                                        value: 'events',
                                        disabled: false,
                                        icon: <CalendarOutlined />,
                                    },
                                    {
                                        label: !isMobile && 'Users',
                                        value: 'users',
                                        disabled: true,
                                        icon: <UserOutlined />
                                    },
                                    {
                                        label: !isMobile && 'Shops',
                                        value: 'shop',
                                        disabled: true,
                                        icon: <ShopOutlined />
                                    },
                                    {
                                        label: !isMobile && 'Blog',
                                        value: 'blog',
                                        disabled: true,
                                        icon: <ReadOutlined />
                                    },
                                    {
                                        label: !isMobile && 'Analytics',
                                        value: 'analytics',
                                        disabled: false,
                                        icon: <PieChartOutlined />
                                    },
                                ]
                            }
                        />
                        <div className='admin__title'>{renderSwitch(adminStore.selectedPage)}</div>
                    </div>
                    :
                    <div className='admin__centered'>
                        <LoginForm />
                    </div>
                }
            </div>
        </>);
});