import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import QRCode from "qrcode.react";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";

import { getLastTicketId } from "./getLastTicketId";
import { saveTicketIdInDatabase } from "./saveTicketIdInDatabase";

import "./TicketGenerator.less";

// TODO: Adapt for Spielbetrieb
export const TicketGenerator = (props) => {
  const { route, event } = props;
  const [ticketNumberValue, setTicketNumberValue] = useState(0);
  const [qrCodeValue, setQrCodeValue] = useState(null);

  useEffect(() => {
    getLastTicketId()
      .then((lastId) => {
        if (lastId.data.getLastTicketId.length === 1) {
          setTicketNumberValue(lastId.data.getLastTicketId[0].id);
        } else {
          setTicketNumberValue(0);
        }
      })
      .catch(console.error);
  }, []);

  const formatTicketNumber = () => {
    if (ticketNumberValue > 99) {
      return `${ticketNumberValue}`;
    } else if (ticketNumberValue > 9) {
      return `0${ticketNumberValue}`;
    } else if (ticketNumberValue >= 0) {
      return `00${ticketNumberValue}`;
    }
  };
  const handleGenerateButtonClick = () => {
    try {
      const uuidValue = uuidv4();
      setQrCodeValue(
        "https://schwerelos-berlin.com/" + route + "/" + event + "/" + uuidValue
      );
      saveTicketIdInDatabase(uuidValue);
      downloadQrCode();
    } catch (e) {
      throw new Error(`Error! ${e}`);
    }
  };

  const downloadQrCode = () => {
    var ticketElement = document.getElementById("qrCodeGenerated");
    html2canvas(ticketElement, { allowTaint: true }).then((canvas) => {
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.download = `schwerelos_ticket_${event}${formatTicketNumber()}.png`;
      link.href = canvas.toDataURL();
      link.target = "_blank";
      link.click();
      document.body.removeChild(link);
    });

    setTicketNumberValue(ticketNumberValue + 1);
  };

  return (
    <div className="qrCodeMainContainer">
      <div className="qrCodeContainer" id={"qrCodeGenerated"}>
        <div className="ticketText textTop">
          Schwerelos Charity <em>low gravity</em> rave
        </div>
        <span className="ticketText textRight">www.schwerelos-berlin.com</span>
        <QRCode
          size={256}
          style={{
            height: "480px",
            width: "480px",
          }}
          value={qrCodeValue}
          viewBox={`0 0 256 256`}
        />
        <span className="ticketText textLeft">
          Ticket number <b>#{formatTicketNumber()}</b>
        </span>
        <div className="ticketText textBottom">
          Scan the qr-code to get more information
        </div>
      </div>
      <br />
      <Button size="large" onClick={handleGenerateButtonClick}>
        Generate and download new ticket
      </Button>
    </div>
  );
};
