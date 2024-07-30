import React from "react";
import { observer } from "mobx-react";

import { pageStore } from "../../store/pageStore/pageStore";

import "./Legal.less";

export const Legal = observer((props) => {
  const { page } = props;

  return (
    <>
      <div
        className={`backgroundLegal ${pageStore.selectedTheme === "dark" ? "backgroundDark" : "backgroundLight"}`}
      ></div>
      <div className="overBackground"></div>
      <div className="legal__container">{page}</div>
    </>
  );
});
