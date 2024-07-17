import React from "react";
import { observer } from "mobx-react";

import errorLogo from "../../img/logos/errorLogo.png";
import { pageStore } from "../../store/pageStore/pageStore";

import "./CustomError.less";

export const CustomError = observer((props) => {
  const size = !props.size
    ? "customError__sizeMedium"
    : props.size === "large"
      ? "customError__sizeLarge"
      : "customError__sizeSmall";
  return (
    <>
      <img
        src={errorLogo}
        className={`customError__logo ${size} ${pageStore.selectedTheme === "light" && "theme__logoInvertColor"}`}
      />
      {props.text && (
        <div
          className={`customError__text ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
        >
          {props.text}
        </div>
      )}
    </>
  );
});
