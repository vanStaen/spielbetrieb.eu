import { observer } from "mobx-react";
import React from "react";

import { eventFormStore } from "../../eventFormStore";

import "./InfoForm.less";

export const InfoForm = observer(() => {
  return <>Eventtype | Title | Date  from | Date to | Location |
    locationCoordinates</>;
});
