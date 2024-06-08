import React from "react";
import { observer } from "mobx-react";

import { DeleteAccountButton } from "./DeleteAccountButton/DeleteAccountButton";;

export const DangerZone = observer(() => {

  return (
    <div className="EditSettings__container">
      <DeleteAccountButton />
    </div>
  );
});
