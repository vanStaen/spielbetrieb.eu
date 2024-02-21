import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import "./Event.less";

export const Event = observer(() => {
  const { t } = useTranslation();
  const params = useParams();
  const eventId = params.id;

  return <>Event</>;
});
