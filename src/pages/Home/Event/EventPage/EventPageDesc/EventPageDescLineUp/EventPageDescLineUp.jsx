import React from "react";
import { observer } from "mobx-react";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { spielplanStore } from "../../../../../../store/spielplanStore/spielplanStore";

import "./EventPageDescLineUp.less";

export const EventPageDescLineUp = observer((props) => {
  const { event, canEdit } = props;
  const { t } = useTranslation();

  const artistFormated = (artistId) => {
    const artistData = spielplanStore.artists.filter(
      (artist) => parseInt(artist._id) === artistId,
    )[0];
    return artistData;
  };

  return (
    <div className="eventpage__lineupContainer">
      <div className="eventpage__lineupTitle">
        {t("event.lineup")}
        {canEdit && <EditOutlined className="editOutlined" />}
      </div>
      <div className="eventpage__lineup">
        {event.lineUp.map((artistId) => {
          return (
            <div className="eventpage__subInfo" key={`artist${artistId}}`}>
              {artistFormated(artistId).name}
            </div>
          );
        })}
      </div>
    </div>
  );
});
