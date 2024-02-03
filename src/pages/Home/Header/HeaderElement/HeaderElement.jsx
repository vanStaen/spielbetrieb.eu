import React from 'react';
import { observer } from 'mobx-react';

import { pageStore } from '../../../../store/pageStore/pageStore';

import './HeaderElement.less';

export const HeaderElement = observer((props) => {
  const {title, disabled, selected} = props;

  return (
    <div className='headerElement__container'>
      <div className={`${disabled ? 'headerElement__disabled' : 'headerElement__enabled'} 
                       ${selected && 'headerElement__selected'}  
                       ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`
                      } >
        {title}
      </div>
    </div>
    );
});