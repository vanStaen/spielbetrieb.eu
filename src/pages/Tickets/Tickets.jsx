import React from "react";

import { GlitchText } from "../../components/GlitchText/GlitchText";
//import { TicketGenerator } from "./TicketGenerator/TicketGenerator";

import "./Tickets.less";

export const Tickets = () => {
  return (
    <div className="pageTicketContainer">
      <div className="backgroundOpacity"></div>
      <div className="ticketContainer">
        <GlitchText overText="want some" glitchText="Tickets?" />
        {/*<TicketGenerator route="ticket" event="charityrave" />*/}
      </div>
    </div>
  );
};
