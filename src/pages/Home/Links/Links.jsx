import React, { useEffect } from "react";
import { observer } from "mobx-react";

import "./Links.less";

export const Links = observer(() => {

  useEffect(() => {
    document.location.href = "https://linktr.ee/spielbetrieb";
  }, [])

  return <>Links</>;
});
