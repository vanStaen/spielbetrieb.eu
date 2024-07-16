import React from "react";
import { observer } from "mobx-react";

import "./Legal.less";

export const Legal = observer((props) => {
  const { page } = props;

  return (
    <>
      <div className="background invertColorTheme" id="background"></div>
      <div className="overBackground"></div>
      <div className="legal__container">{page}</div>
    </>
  );
});
