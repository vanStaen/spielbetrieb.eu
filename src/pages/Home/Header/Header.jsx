import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { MenuOutlined } from '@ant-design/icons';

import { pageStore } from '../../../store/pageStore/pageStore';
import { Menu } from '../../../components/Menu/Menu';
import { Socials } from '../../../components/Socials/Socials';
import { HeaderElement } from './HeaderElement/HeaderElement';
import { HeaderMenuMobile } from './HeaderMenuMobile/HeaderMenuMobile';
import SpielbetriebLogo from '../../../img/logos/spielbetriebLogoInverted.png';

import './Header.less';

export const Header = observer(() => {

  const [showMenuMobile, setShowMenuMobile] = useState(false);

    return (
        <div className={`header__container ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__Header' : 'darkColorTheme__Header'}`}>
            <img
              src={SpielbetriebLogo}
              id="spielbetriebLogo"
              className="header__logo invertColorTheme"
            />
            <div 
              className='header__menuMobile invertColorTheme'
              onClick={() => setShowMenuMobile(!showMenuMobile)}
            >
              <MenuOutlined/>
            </div>
            {showMenuMobile && 
              <HeaderMenuMobile setShowMenuMobile={setShowMenuMobile}/>
            }
            <div className='header__headerElementContainer'>
                <HeaderElement title='Spielplan' selected /> 
                <HeaderElement title='Shop' disabled />
                <HeaderElement title='Dark Magazin' />
                <HeaderElement title='Partner' disabled />
            </div>
            <Menu />
            <div className='header__socials'>
              <Socials />
            </div>
            
        </div>
    );
})
