import React from "react";
import { observer } from "mobx-react";

import waitLogo from "../../../../../img/logos/waitLogo.png";
import { pageStore } from "../../../../../store/pageStore/pageStore";

import "./EventPageInValidation.less";

export const EventPageInValidation = observer(() => {
  return (
    <div
      className={`eventpagevalidated__container ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
    >
      <div className="eventpagevalidated__text">
        <img src={waitLogo} width="50px" className="logo invertColorTheme" />
        <div className="text">Event now pending review</div>
        <div className="subText">
          This will be available after it has been reviewed by our team.
        </div>
      </div>
    </div>
  );
});
