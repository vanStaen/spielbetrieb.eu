import React from "react";
import SpielbetriebLogo from "../../img/logos/spielbetriebLogo.png";

import "./CustomSpinner.less";

export const CustomSpinner = (props) => {
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
        className={`customSpinner__logo ${size}`}
      />
      {props.text && <div className="customSpinner__text">{props.text}</div>}
    </>
  );
};
