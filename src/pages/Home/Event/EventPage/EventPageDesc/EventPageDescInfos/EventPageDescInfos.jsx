import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import {
  ClockCircleOutlined,
  EuroOutlined,
  InfoCircleOutlined,
  TagsOutlined,
  EditOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { nameParser } from "../../../../../../helpers/dev/nameParser";
import { priceOptions } from "../../../../../../lib/data/priceOptions";

import { spielplanStore } from "../../../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";

import "./EventPageDescInfos.less";

export const EventPageDescInfos = observer((props) => {
  const { event, eventTypeName } = props;
  const { t } = useTranslation();

  const eventTags = () => {
    const eventTags = event?.eventTags?.map((tagId) => {
      return {
        name: nameParser(
          spielplanStore.tags.filter((tag) => parseInt(tag._id) === tagId)[0]
            ?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: tagId,
      };
    });
    eventTags?.splice(0, 0, {
      name: eventTypeName,
      id: event?.eventtype,
    });

    const tagsFormatted = eventTags?.map((tag) => {
      return (
        <Tag key={tag.id} bordered={false}>
          #{tag.name}
        </Tag>
      );
    });
    return tagsFormatted;
  };

  const dresscodeDoTags = () => {
    const dresscodeDoTags = event?.dresscodeDoTags?.map((tagId) => {
      return {
        name: nameParser(
          spielplanStore.dresscodes.filter(
            (tag) => parseInt(tag._id) === tagId,
          )[0]?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: tagId,
      };
    });

    const dresscodeDoTagsFormatted = dresscodeDoTags?.map((tag) => {
      return (
        <Tag key={tag.id} bordered={false}>
          {tag.name}
        </Tag>
      );
    });
    return dresscodeDoTagsFormatted;
  };

  const dresscodeDontTags = () => {
    const dresscodeDontTags = event?.dresscodeDontTags?.map((tagId) => {
      return {
        name: nameParser(
          spielplanStore.dresscodes.filter(
            (tag) => parseInt(tag._id) === tagId,
          )[0]?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: tagId,
      };
    });

    const dresscodeDontTagsFormatted = dresscodeDontTags?.map((tag) => {
      return (
        <Tag key={tag.id} bordered={false}>
          🚫 {tag.name}
        </Tag>
      );
    });
    return dresscodeDontTagsFormatted;
  };

  return (
    <div className="eventpage__infoContainer">
      <div className="eventpage__infoTitle">
        Event infos <EditOutlined className="editOutlined" />
      </div>
      <div className="eventpage__info">
        <div className="eventpage__subInfo">
          <ClockCircleOutlined className="eventpage__infoIcon" />{" "}
          {dayjs(event.fromDate).format("dddd") ===
          dayjs(event.untilDate).format("dddd") ? (
            <>
              {dayjs(event.fromDate).format("HH:mm")} {t("spielplan.until")}{" "}
              {dayjs(event.untilDate).format("HH:mm")}
            </>
          ) : (
            <>
              {dayjs(event.fromDate).format("dddd HH:mm")}{" "}
              {t("spielplan.until")}{" "}
              {dayjs(event.untilDate).format("dddd HH:mm")}
            </>
          )}
        </div>
        {event.prices?.length > 0 && (
          <div className="eventpage__subInfo">
            <EuroOutlined className="eventpage__infoIcon" />{" "}
            {event.prices.map((price, index) => {
              return (
                <div
                  className="eventpage__subInfoPrice"
                  key={`priceElement${index}}`}
                >
                  {price.amount}€ ({priceOptions[price.option].label})
                </div>
              );
            })}
          </div>
        )}
        {!!event.ageMin && (
          <div className="eventpage__subInfo">
            <InfoCircleOutlined className="eventpage__infoIcon" /> This is a{" "}
            {event.ageMin}+ event
          </div>
        )}
        {!!event.hasDresscode && (
          <div className="eventpage__subInfo">
            <SkinOutlined className="eventpage__infoIcon" /> Dresscode{" "}
            {dresscodeDoTags()}
            {dresscodeDontTags()}
          </div>
        )}
        <div className="eventpage__tags">
          <TagsOutlined className="eventpage__infoIcon" /> {eventTags()}
        </div>
      </div>
    </div>
  );
});
