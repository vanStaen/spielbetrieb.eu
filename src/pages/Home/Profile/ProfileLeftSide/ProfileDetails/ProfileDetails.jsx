import React from "react";
import { observer } from "mobx-react";

import { ProfileDetailsPartner } from "./ProfileDetailsPartner";
import { ProfileDetailsUser } from "./ProfileDetailsUser";

export const ProfileDetails = observer((props) => {
  const { isPartner } = props;
  return isPartner ? <ProfileDetailsPartner /> : <ProfileDetailsUser />;
});
