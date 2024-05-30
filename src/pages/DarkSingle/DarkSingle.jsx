import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import dark6pdf from "../../files/pdf/dark6.pdf";

import "./DarkSingle.less";

export const DarkSingle = observer(() => {
  const params = useParams();

  return (
    <div className="darksingle__container">
      <iframe src={dark6pdf} width="100%" height="100%" />
    </div>
  );
});
