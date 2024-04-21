import React from "react";
import { observer } from "mobx-react";
import { Select } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { addOption } from "./addOption";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const OptionFormLineUp = observer((props) => {
  const { fetchArtists, artistsOptions } = props;

  const lineUpHandler = async (value) => {
    const lineUpArray = await Promise.all(
      value.map(async (artist) => {
        if (typeof artist === "string") {
          const newArtistId = await addOption(artist, "artist");
          await fetchArtists();
          return newArtistId;
        }
        return artist;
      }),
    );
    eventFormStore.setLineUp(lineUpArray);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        lineUp: lineUpArray,
      });
  };

  return (
    <div className="optionform__element">
      <div className="optionform__title">Line up</div>
      <Select
        mode="tags"
        allowClear
        style={{ width: "100%" }}
        placeholder="Line Up of your event, if any"
        options={artistsOptions}
        onChange={lineUpHandler}
        value={eventFormStore.lineUp}
        filterOption={(inputValue, option) =>
          option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onFocus={() => eventFormStore.setDeactivateNav(true)}
        onBlur={() => eventFormStore.setDeactivateNav(false)}
      />
    </div>
  );
});