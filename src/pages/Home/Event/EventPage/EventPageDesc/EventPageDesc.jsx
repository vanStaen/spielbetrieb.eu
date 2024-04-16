import React from "react";
import { Button, Typography, Tag } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  TagOutlined,
  EuroOutlined,
  InfoCircleOutlined,
  TagsOutlined,
  EditOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import { nameParser } from "../../../../../helpers/dev/nameParser";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";
import { priceOptions } from "../../../../../lib/data/priceOptions";

import "./EventPageDesc.less";

export const EventPageDesc = observer((props) => {
  const { t } = useTranslation();
  const { Paragraph } = Typography;
  const { ref2, ref3, ref4, ref5, ref6, event } = props;

  // console.log(event);

  const eventTypeName = nameParser(
    spielplanStore.eventtypes.filter(
      (eventtype) => parseInt(eventtype._id) === event?.eventtype,
    )[0]?.name,
    pageStore.selectedLanguage?.toLowerCase(),
  );

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

  const equipmentsTags = () => {
    const equipments = event?.equipment?.map((equipementId) => {
      return {
        name: nameParser(
          spielplanStore.equipments.filter(
            (equipment) => parseInt(equipment._id) === equipementId,
          )[0]?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: equipementId,
      };
    });

    const equipmentsTagsFormatted = equipments?.map((equipment) => {
      return (
        <Tag key={equipment.id} bordered={false}>
          {equipment.name}
        </Tag>
      );
    });
    return equipmentsTagsFormatted;
  };

  const artistFormated = (artistId) => {
    const artistData = spielplanStore.artists.filter(
      (artist) => parseInt(artist._id) === artistId,
    )[0];
    return artistData;
  };

  return (
    <div className="eventpage__descCol">
      <div className="eventpage__title" ref={ref2}>
        {event.title}
      </div>
      <div ref={ref3}>
        <div className="eventpage__date">
          <span className="eventpage__weekday">
            {dayjs(event.fromDate).format("dddd")}
          </span>{" "}
          <span className="eventpage__daymonth">
            {dayjs(event.fromDate).format("DD MMMM")}
          </span>{" "}
          <span className="eventpage__year">
            {dayjs(event.fromDate).format("YYYY")}
          </span>
        </div>
        <div className="eventpage__typeLocation">
          <span className="eventpage__typeLocationSpan">
            <TagOutlined className="eventpage__typeLocationIcon" />{" "}
            {eventTypeName}
          </span>
          {event.location?.name && event.location?.Address && (
            <span className="eventpage__typeLocationSpan">
              <EnvironmentOutlined className="eventpage__typeLocationIcon" />{" "}
              {event.locationName}
            </span>
          )}
        </div>
      </div>
      {event.description && (
        <div className="eventpage__descContainer">
          <div className="eventpage__descTitle">
            Event description <EditOutlined className="editOutlined" />
          </div>
          <div className="eventpage__desc" ref={ref6}>
            <Paragraph
              className="eventpage__desc"
              ellipsis={{ rows: 7, expandable: true, symbol: "more" }}
            >
              {event.description}
            </Paragraph>
          </div>
        </div>
      )}
      <div className="eventpage__infoContainer">
        <div className="eventpage__infoTitle">
          Event infos <EditOutlined className="editOutlined" />
        </div>
        <div className="eventpage__info" ref={ref4}>
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
      {!!event.lineUp?.length && (
        <div className="eventpage__lineupContainer">
          <div className="eventpage__lineupTitle">
            Line up <EditOutlined className="editOutlined" />
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
      )}
      {!!event.equipment?.length > 0 && (
        <div className="eventpage__equipementContainer">
          <div className="eventpage__equipmentTitle">
            Equipment <EditOutlined className="editOutlined" />
          </div>
          <div className="eventpage__subInfo">{equipmentsTags()}</div>
        </div>
      )}

      <div className="eventpage__locationContainer" ref={ref5}>
        <div className="eventpage__locationTitle">
          Location <EditOutlined className="editOutlined" />
        </div>
        {event.location?.name && event.location?.Address ? (
          <div className="eventpage__location">
            <div className="eventpage__subInfo">{event.locationName}</div>
            <div className="eventpage__subInfo">{event.locationAddress}</div>
            <div className="eventpage__subInfo">
              <a
                href={`https://www.google.com/maps?q=${event.locationName?.replaceAll(" *", "+")}+${event.locationAddress?.replaceAll(" *", "+")}&ll=${event.locationCoordinates?.replaceAll(" *", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button shape="round">Show me on a map</Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="eventpage__location">
            <div className="eventpage__subInfo">To be announced</div>
          </div>
        )}
      </div>
    </div>
  );
});
