import React from 'react';
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";
import { adminStore } from "../../store/adminStore";
import { PinInput } from './PinInput/PinInput';

import './Admin.less';

export const Admin = observer(() => {
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

                {adminStore.hasAdminAccess ?
                    <div className='admin__title'>Welcome into the inner circle</div>
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