import React from 'react';
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { adminStore } from "../../store/adminStore";
import { PinInput } from './PinInput/PinInput';

import './Admin.less';


const subdomain = 'admin';
const domain = window.location.host.slice(subdomain.length + 1);
const baseUrl = domain.slice(0, 9) === 'localhost' ? 'http://' + domain : 'https://' + domain;

export const Admin = observer(() => {
    return (
        <>
            <div className='background'></div>
            <div className='admin__container'>
                <Link to={baseUrl}>
                    <Tooltip title="Back to main page" placement="left">
                        <img
                            src={SpielbetriebLogo}
                            id="spielbetriebLogo"
                            className="admin__logo"
                        />
                    </Tooltip>
                </Link>

                {adminStore.hasAdminAccess ?
                    <div onClick={() => adminStore.setHasAdminAccess(false)}>welcome in mah boy </div>
                    :
                    <>
                        <div className='admin__title'>
                            Admin page
                        </div>
                        <PinInput login={adminStore.pinLogin} />
                    </>
                }
            </div>
        </>);
});