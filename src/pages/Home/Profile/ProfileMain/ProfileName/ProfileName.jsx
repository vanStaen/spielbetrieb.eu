import React from "react";
import { observer } from "mobx-react";

import { partnerStore } from "../../../../../store/partnerStore/partnerStore";

import "./ProfileName.less";

// TODO: Add civerpic/titlebild? 

export const ProfileName = observer((props) => {
  return (
    <>
      <div className="profileName__container">
        <div className="profileName__main">
          {partnerStore.name}
        </div>
      </div>
    </>
  );
});
