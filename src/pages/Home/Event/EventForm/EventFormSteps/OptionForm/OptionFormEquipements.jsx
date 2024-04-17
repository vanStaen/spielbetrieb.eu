import React from "react";
import { observer } from "mobx-react";
import { Select } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const OptionFormEquipements = observer((props) => {
    const { equipmentsOptions } = props;

    const equipmentHandler = (value) => {
        eventFormStore.setEquipment(value);
        eventFormStore.eventId &&
            updateEvent(eventFormStore.eventId, {
                equipment: value,
            });
    };

    return (
        <div className="optionform__element">
            <div className="optionform__title">Play equipment</div>
            <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Does your event has any furniture/accessories?"
                options={equipmentsOptions}
                onChange={equipmentHandler}
                value={eventFormStore.equipment}
                onFocus={() => eventFormStore.setDeactivateNav(true)}
                onBlur={() => eventFormStore.setDeactivateNav(false)}
                filterOption={(inputValue, option) =>
                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                    -1
                }
            />
        </div>
    )
})

