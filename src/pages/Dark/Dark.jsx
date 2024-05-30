import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { DarkModeDropDown } from "../../components/DarkModeDropDown/DarkModeDropDown";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";
import dark6pdf from "../../files/pdf/dark6.pdf";

import "./Dark.less";

export const Dark = observer(() => {
  const params = useParams();

  return (
    <div className="dark__container">
      <iframe src={dark6pdf} width='100%' height='100%' />
    </div>
  );
});
