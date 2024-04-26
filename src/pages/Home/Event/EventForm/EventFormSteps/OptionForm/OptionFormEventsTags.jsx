import React from "react";
import { observer } from "mobx-react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { addOption } from "./addOption";

export const OptionFormEventsTags = observer((props) => {
  const { tagsOptions, fetchTags } = props;
  const { t } = useTranslation();

  const tagsHandler = async (value) => {
    const tagArray = await Promise.all(
      value.map(async (tag) => {
        if (typeof tag === "string") {
          const newTagId = await addOption(tag, "tag");
          await fetchTags();
          return newTagId;
        }
        return tag;
      }),
    );
    eventFormStore.setEventTags(tagArray);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        eventTags: tagArray,
      });
  };

  return (
    <div className="optionform__element">
      <div className="optionform__title">{t("eventform.tags")}</div>
      <Select
        mode="tags"
        allowClear
        style={{ width: "100%" }}
        placeholder={t("eventform.pleaseSelectTags")}
        options={tagsOptions}
        onChange={tagsHandler}
        value={eventFormStore.eventTags}
        onFocus={() => eventFormStore.setDeactivateNav(true)}
        onBlur={() => eventFormStore.setDeactivateNav(false)}
        filterOption={(inputValue, option) =>
          option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </div>
  );
});
