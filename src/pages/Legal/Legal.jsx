import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

import { pageStore } from '../../store/pageStore/pageStore';
import { DarkModeDropDown } from '../../components/DarkModeDropDown/DarkModeDropDown';
import { LanguageDropDown } from '../../components/LanguageDropDown/LanguageDropDown';

import './Legal.less';

export const Legal = observer((props) => {
  const { t } = useTranslation();
  const { page } = props;

  return (
    <>
      <LanguageDropDown />
      <DarkModeDropDown />
      <div className="background invertColorTheme" id="background"></div>
      <div className="legal__container">
        {page}
      </div>
    </>
  );
});
