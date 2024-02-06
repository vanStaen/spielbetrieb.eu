import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { pageStore } from '../../../../store/pageStore/pageStore';

import './HeaderElement.less';

export const HeaderElement = observer((props) => {
  const {title, disabled, selected, page} = props;

  return (
    <div className='headerElement__container'>
      {
      disabled ? 
        <div className={`headerElement__disabled ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`} >
          {title}
        </div>
      :
        <Link className="link" to={`/${page}/`}>
          <div className={`headerElement__enabled ${selected && 'headerElement__selected'} ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`} >
            {title}
          </div>
        </Link>
      }
    </div>
    );
});