import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";

import "./Links.less";

export const Links = observer(() => {
  useEffect(() => {
    document.location.href = "https://linktr.ee/spielbetrieb";
  }, []);

  return (
    <div className="links__container">
      <CustomSpinner text="You will be redirected" />
    </div>
  );
});
