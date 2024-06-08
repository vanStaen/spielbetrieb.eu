import React from "react";

import SpielbetriebLogo from "../../../img/logos/spielbetriebLogoNew.png";

import "./AdminCustomSpinner.less";

export const AdminCustomSpinner = (props) => {
  return (
    <>
      <img
        src={SpielbetriebLogo}
        id="spielbetriebLogo"
        className="adminSpinner__logo size theme__logoInvertColor"
      />
      {props.text && (
        <div className="adminSpinner__text darkColorTheme__Text">
          {props.text}
        </div>
      )}
    </>
  );
};
