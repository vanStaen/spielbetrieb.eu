import React from "react";
import { observer } from "mobx-react";
import { Radio } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { yesNoOptions } from "../../../../../../lib/data/yesNoOptions";

export const OptionFormPrivateEvent = observer(() => {

    const isPrivateHandler = (e) => {
        const value = e.target.value;
        eventFormStore.setIsPrivate(value);
        eventFormStore.eventId &&
            updateEvent(eventFormStore.eventId, {
                private: value,
            });
    };

    const forwardableHandler = (e) => {
        const value = e.target.value;
        eventFormStore.setForwardable(value);
        eventFormStore.eventId &&
            updateEvent(eventFormStore.eventId, {
                forwardable: value,
            });
    };

    return (
        <>
            <div className="optionform__element">
                <div className="optionform__title">Is this a private event?</div>
                <Radio.Group
                    options={yesNoOptions}
                    optionType="button"
                    onChange={isPrivateHandler}
                    value={eventFormStore.isPrivate}
                />
            </div>
            {eventFormStore.isPrivate && (
                <div className="optionform__element">
                    <div className="optionform__title">Can be it forwarded?</div>
                    <Radio.Group
                        options={yesNoOptions}
                        optionType="button"
                        onChange={forwardableHandler}
                        value={eventFormStore.forwardable}
                    />
                </div>
            )}
        </>
    )
})

