import React from 'react';
import { observer } from 'mobx-react';

import { pageStore } from '../../../store/pageStore/pageStore';
import { Menu } from '../../../components/Menu/Menu';
import { Socials } from '../../../components/Socials/Socials';
import { HeaderElement } from './HeaderElement/HeaderElement';
import SpielbetriebLogo from '../../../img/logos/spielbetriebLogoInverted.png';

import './Header.less';

export const Header = observer(() => {
    return (
        <div className={`header__container ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__Header' : 'darkColorTheme__Header'}`}
        >
            <img
              src={SpielbetriebLogo}
              id="spielbetriebLogo"
              className="header__logo invertColorTheme"
            />
            <div className='header__headerElementContainer'>
                <HeaderElement title='Spielplan' selected /> 
                <HeaderElement title='Shop' disabled />
                <HeaderElement title='Partner' disabled />
                <HeaderElement title='Spielbetrieb' disabled />
                <HeaderElement title='Dark Magazin' />
            </div>
            <Menu />
            <div className='header__socials'>
              <Socials />
            </div>
            
        </div>
    );
})
