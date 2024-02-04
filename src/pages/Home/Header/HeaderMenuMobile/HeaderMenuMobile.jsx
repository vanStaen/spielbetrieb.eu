import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { pageStore } from '../../../../store/pageStore/pageStore';

import './HeaderMenuMobile.less';

export const HeaderMenuMobile = observer((props) => {

    useEffect(() => {
          const elementBackground = document.getElementById('headerMenuMobile__silentBackground');
          const elementContainer = document.getElementById('headerMenuMobile__container');
          //elementBackground.style.backdropFilter = 'blur(7px) grayscale(25%)';
          elementContainer.style.opacity = 1;
      });

    const handleHideMenu = () => {
        const elementBackground = document.getElementById('headerMenuMobile__silentBackground');
        const elementContainer = document.getElementById('headerMenuMobile__container');
        elementBackground.style.backdropFilter = 'blur(0px) grayscale(0%)';
        elementContainer.style.opacity = 0;
        setTimeout(function () {
            pageStore.setShowMenuMobile(false);
        }, 300);
    };

    return (
            <>
                <div
                    className="headerMenuMobile__silentBackground"
                    id="headerMenuMobile__silentBackground"
                    onClick={handleHideMenu}
                >
                </div>
                <div
                className={`headerMenuMobile__container ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__Menu' : 'darkColorTheme__Menu'}`}
                id="headerMenuMobile__container"
                >
                    <div className="menu__element">Spielplan</div>
                <div className="menu__whiteline"></div>
                    <div className="menu__elementDisabled">Shop</div>
                <div className="menu__whiteline"></div>
                    <div className="menu__element">Dark Magazin</div>
                <div className="menu__whiteline"></div>
                    <div className="menu__elementDisabled">Partner</div>
                </div>
            </>
        ); 
});