import React from "react";
import { observer } from "mobx-react";
import { Radio, Select, Row, Col } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { hasDresscode } from "../../../../../../lib/data/hasDresscode";
import { addOption } from "./addOption";

export const OptionFormDresscodes = observer((props) => {
    const { dresscodesOptions, fetchDresscodes } = props;

    const hasDresscodeHandler = (e) => {
        const value = e.target.value;
        eventFormStore.setHasDresscode(value);
        if (value === 0) {
            eventFormStore.setDresscodeErrors(null);
        }
        eventFormStore.eventId &&
            updateEvent(eventFormStore.eventId, {
                hasDresscode: value,
            });
    };

    const dresscodeDoTagsHandler = async (value) => {
        const dresscodeDoTagArray = await Promise.all(
            value.map(async (tag) => {
                if (typeof tag === "string") {
                    const newDresscodeTagId = await addOption(tag, "dresscode");
                    await fetchDresscodes();
                    return newDresscodeTagId;
                }
                return tag;
            }),
        );
        eventFormStore.setDresscodeDoTags(dresscodeDoTagArray);
        dresscodeDoTagArray.length > 0 && eventFormStore.setDresscodeErrors(null);
        eventFormStore.eventId &&
            updateEvent(eventFormStore.eventId, {
                dresscodeDoTags: dresscodeDoTagArray,
            });
    };

    const dresscodeDontTagsHandler = async (value) => {
        const dresscodeDontTagArray = await Promise.all(
            value.map(async (tag) => {
                if (typeof tag === "string") {
                    const newDresscodeTagId = await addOption(tag, "dresscode");
                    await fetchDresscodes();
                    return newDresscodeTagId;
                }
                return tag;
            }),
        );
        eventFormStore.setDresscodeDontTags(dresscodeDontTagArray);
        dresscodeDontTagArray.length > 0 && eventFormStore.setDresscodeErrors(null);
        eventFormStore.eventId &&
            updateEvent(eventFormStore.eventId, {
                dresscodeDontTags: dresscodeDontTagArray,
            });
    };

    return (
        <>
            <div className="optionform__element">
                <div className="optionform__title">Dresscode</div>
                <Radio.Group
                    options={hasDresscode}
                    optionType="button"
                    onChange={hasDresscodeHandler}
                    value={eventFormStore.hasDresscode}
                />
                <div className="optionform__error optionform__dresscodeError">
                    {eventFormStore.dresscodeErrors && (
                        <>{eventFormStore.dresscodeErrors}</>
                    )}
                </div>
            </div>
            {!!eventFormStore.hasDresscode && (
                <div className="optionform__element">
                    <Row gutter={[16, 8]}>
                        <Col xs={24} sm={24} md={12}>
                            <div className="optionform__title">Dresscode allowed</div>
                            <Select
                                mode="tags"
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="What should people wear?"
                                options={dresscodesOptions}
                                value={eventFormStore.dresscodeDoTags}
                                onChange={dresscodeDoTagsHandler}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                                filterOption={(inputValue, option) =>
                                    option.label
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <div className="optionform__title">Dresscode forbidden</div>
                            <Select
                                mode="tags"
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="What can't people wear?"
                                options={dresscodesOptions}
                                value={eventFormStore.dresscodeDontTags}
                                onChange={dresscodeDontTagsHandler}
                                onFocus={() => eventFormStore.setDeactivateNav(true)}
                                onBlur={() => eventFormStore.setDeactivateNav(false)}
                                filterOption={(inputValue, option) =>
                                    option.label
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                        </Col>
                    </Row>
                </div>
            )}
        </>
    )
})

