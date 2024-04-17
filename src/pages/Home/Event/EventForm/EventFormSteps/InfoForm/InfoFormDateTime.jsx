import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { InputNumber, Space, Row, Col } from "antd";
import dayjs from "dayjs";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const InfoFormDateTime = observer(() => {
    const [fromDay, setFromDay] = useState(null);
    const [fromMonth, setFromMonth] = useState(null);
    const [fromYear, setFromYear] = useState(null);
    const [fromHour, setFromHour] = useState(null);
    const [fromMin, setFromMin] = useState(null);
    const [untilDay, setUntilDay] = useState(null);
    const [untilMonth, setUntilMonth] = useState(null);
    const [untilYear, setUntilYear] = useState(null);
    const [untilHour, setUntilHour] = useState(null);
    const [untilMin, setUntilMin] = useState(null);

    useEffect(() => {
        const newFromDate = dayjs(eventFormStore.fromDate);
        if (newFromDate.isValid()) {
            setFromDay(newFromDate.format("DD"));
            setFromMonth(newFromDate.format("MM"));
            setFromYear(newFromDate.format("YYYY"));
            setFromHour(newFromDate.format("HH"));
            setFromMin(newFromDate.format("mm"));
        }
    }, [eventFormStore.fromDate]);

    useEffect(() => {
        const newUntilDate = dayjs(eventFormStore.untilDate);
        if (newUntilDate.isValid()) {
            setUntilDay(newUntilDate.format("DD"));
            setUntilMonth(newUntilDate.format("MM"));
            setUntilYear(newUntilDate.format("YYYY"));
            setUntilHour(newUntilDate.format("HH"));
            setUntilMin(newUntilDate.format("mm"));
        }
    }, [eventFormStore.untilDate]);

    useEffect(() => {
        const fromDate = dayjs(
            `${fromDay}-${fromMonth}-${fromYear} ${fromHour}:${fromMin}`,
            "D-M-YYYY H:m",
        );
        const untilDate = dayjs(
            `${untilDay}-${untilMonth}-${untilYear} ${untilHour}:${untilMin}`,
            "D-M-YYYY H:m",
        );
        if (
            fromDate.isValid() &&
            untilDate.isValid() &&
            fromDate.valueOf() >= untilDate.valueOf()
        ) {
            eventFormStore.setFromDateError(
                "The event can not end before it has started!",
            );
        } else if (fromDate.isValid() && fromDate < dayjs()) {
            eventFormStore.setFromDateError("An event can not start in the past!");
        } else if (fromDate.isValid() && untilDate.isValid()) {
            eventFormStore.setFromDateError(null);
        }
        if (fromDate.isValid()) {
            eventFormStore.setFromDate(fromDate);
            eventFormStore.eventId &&
                updateEvent(eventFormStore.eventId, {
                    fromDate: fromDate.valueOf(),
                });
        }
        if (untilDate.isValid()) {
            eventFormStore.setUntilDate(untilDate);
            eventFormStore.eventId &&
                updateEvent(eventFormStore.eventId, {
                    untilDate: untilDate.valueOf(),
                });
        }
    }, [
        fromDay,
        fromMonth,
        fromYear,
        fromHour,
        fromMin,
        untilDay,
        untilMonth,
        untilYear,
        untilHour,
        untilMin,
    ]);

    const formatDateValue = (value) => {
        if (!value) {
            return;
        } else if (value < 10) {
            return `0${value}`;
        }
        return value;
    };

    const now = {
        year: dayjs().format("YYYY"),
    };

    return (
        <>
            <div className="infoform__element">
                <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={11}>
                        <div className="infoform__title">Date from</div>
                        <Space.Compact style={{ width: "65%" }}>
                            <InputNumber
                                style={{ width: "30%" }}
                                placeholder="day"
                                value={fromDay}
                                onChange={(value) => setFromDay(value)}
                                formatter={formatDateValue}
                                min={1}
                                max={31}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                            <InputNumber
                                style={{ width: "30%" }}
                                placeholder="month"
                                value={fromMonth}
                                onChange={(value) => setFromMonth(value)}
                                formatter={formatDateValue}
                                min={1}
                                max={12}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                            <InputNumber
                                style={{ width: "40%" }}
                                placeholder="year"
                                value={fromYear}
                                onChange={(value) => setFromYear(value)}
                                formatter={formatDateValue}
                                min={now.year}
                                max={parseInt(now.year) + 3}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                        </Space.Compact>
                        <Space.Compact
                            style={{ width: "calc(35% - 16px)", paddingLeft: "16px" }}
                        >
                            <InputNumber
                                style={{ width: "50%" }}
                                placeholder="hour"
                                value={fromHour}
                                onChange={(value) => setFromHour(value)}
                                formatter={formatDateValue}
                                min={0}
                                max={23}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                            <InputNumber
                                style={{ width: "50%" }}
                                placeholder="min"
                                value={fromMin}
                                onChange={(value) => setFromMin(value)}
                                formatter={formatDateValue}
                                min={0}
                                max={59}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                        </Space.Compact>
                    </Col>
                    <Col xs={0} sm={0} md={2}>
                        <div className="infoform__centeredDivArrow">
                            <ArrowRightOutlined />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={11}>
                        <div className="infoform__title">Date until</div>
                        <Space.Compact style={{ width: "65%" }}>
                            <InputNumber
                                style={{ width: "30%" }}
                                placeholder="day"
                                value={untilDay}
                                onChange={(value) => setUntilDay(value)}
                                formatter={formatDateValue}
                                min={1}
                                max={31}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                            <InputNumber
                                style={{ width: "30%" }}
                                placeholder="month"
                                value={untilMonth}
                                onChange={(value) => setUntilMonth(value)}
                                formatter={formatDateValue}
                                min={1}
                                max={12}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                            <InputNumber
                                style={{ width: "40%" }}
                                placeholder="year"
                                value={untilYear}
                                onChange={(value) => setUntilYear(value)}
                                formatter={formatDateValue}
                                min={now.year}
                                max={parseInt(now.year) + 3}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                        </Space.Compact>
                        <Space.Compact
                            style={{ width: "calc(35% - 16px)", paddingLeft: "16px" }}
                        >
                            <InputNumber
                                style={{ width: "50%" }}
                                placeholder="hour"
                                value={untilHour}
                                onChange={(value) => setUntilHour(value)}
                                formatter={formatDateValue}
                                min={0}
                                max={23}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                            <InputNumber
                                style={{ width: "50%" }}
                                placeholder="min"
                                value={untilMin}
                                onChange={(value) => setUntilMin(value)}
                                formatter={formatDateValue}
                                min={0}
                                max={59}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                            />
                        </Space.Compact>
                    </Col>
                </Row>
                <div className="infoform__error">
                    {eventFormStore.fromDateError && <>{eventFormStore.fromDateError}</>}
                </div>
            </div>
        </>
    );
});
