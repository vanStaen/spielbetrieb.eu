import React from 'react';
import { observer } from 'mobx-react';
import { LinkOutlined, InstagramOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { pageStore } from '../../store/pageStore/pageStore';

import './Socials.less';

export const Socials = observer (() => {
    return ( 
        <div className='socials__container'>
            <div className={`socials__link ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`} >
                <Tooltip title="Instagram" placement="bottom">
                    <a
                        href="https://www.instagram.com/spiel_betrieb/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <InstagramOutlined />
                    </a>
                </Tooltip>
            </div>
            <div className={`socials__link ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`} >
                <Tooltip title="Linktree" placement="bottom">
                    <a
                        href="https://linktr.ee/spielbetrieb"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <LinkOutlined />
                    </a>
                </Tooltip>
            </div>
        </div>
    )
} )