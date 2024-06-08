import React from "react";
import { observer } from "mobx-react";

import SpielbetriebLogo from "../../img/logos/spielbetriebLogoNew.png";
import { pageStore } from "../../store/pageStore/pageStore";

import "./CustomSpinner.less";

export const CustomSpinner = observer((props) => {
  const size = !props.size
    ? "customSpinner__sizeMedium"
    : props.size === "large"
      ? "customSpinner__sizeLarge"
      : "customSpinner__sizeSmall";
  return (
    <>
      <img
        src={SpielbetriebLogo}
        id="spielbetriebLogo"
        className={`customSpinner__logo ${size} ${pageStore.selectedTheme === "dark" && "theme__logoInvertColor"}`}
      />
      {props.text && (
        <div
          className={`customSpinner__text ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
        >
          {props.text}
        </div>
      )}
    </>
  );
});
