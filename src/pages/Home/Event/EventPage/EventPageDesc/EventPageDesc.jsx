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
} from "@ant-design/icons";
import dayjs from "dayjs";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import { nameParser } from "../../../../../helpers/dev/nameParser";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";

import "./EventPageDesc.less";

export const EventPageDesc = observer((props) => {
    const { t } = useTranslation();
    const { Paragraph } = Typography;
    const { ref2, ref3, ref4, ref5, ref6, event } = props;

    //console.log(event);

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
            name: nameParser(
                spielplanStore.eventtypes.filter(
                    (eventtype) => parseInt(eventtype._id) === event?.eventtype,
                )[0]?.name,
                pageStore.selectedLanguage?.toLowerCase(),
            ),
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

    const eventType = spielplanStore.eventtypes?.filter(
        (et) => parseInt(et._id) === event?.eventtype,
    )[0];

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
                        {nameParser(eventType?.name, pageStore.selectedLanguage)}
                    </span>
                    <span className="eventpage__typeLocationSpan">
                        <EnvironmentOutlined className="eventpage__typeLocationIcon" />{" "}
                        {event.locationName}
                    </span>
                </div>
            </div>
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
                    <div className="eventpage__subInfo">
                        <EuroOutlined className="eventpage__infoIcon" /> 22€ (tickets
                        online) - 25€ (at the door)
                    </div>
                    <div className="eventpage__subInfo">
                        <InfoCircleOutlined className="eventpage__infoIcon" /> This is an
                        21+ event, with dresscode
                    </div>
                    <div className="eventpage__tags">
                        <TagsOutlined className="eventpage__infoIcon" /> {eventTags()}
                    </div>
                </div>
            </div>
            {event.lineup && (
                <div className="eventpage__lineupContainer">
                    <div className="eventpage__lineupTitle">
                        Line up <EditOutlined className="editOutlined" />
                    </div>
                    <div className="eventpage__lineup">
                        <div className="eventpage__subInfo">First Artist</div>
                        <div className="eventpage__subInfo">Second Artist</div>
                    </div>
                </div>
            )}
            <div className="eventpage__locationContainer">
                <div className="eventpage__locationTitle">
                    Location <EditOutlined className="editOutlined" />
                </div>
                <div className="eventpage__location" ref={ref5}>
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
            </div>
        </div>
    );
});
