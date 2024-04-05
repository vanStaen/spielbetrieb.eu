import React, { useState } from "react";
import { observer } from "mobx-react";
import { Radio, Input, Select, DatePicker } from 'antd';

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from '../../../../../../store/pageStore/pageStore';

import "./InfoForm.less";

export const InfoForm = observer((props) => {
  const [showMore, setShowMore] = useState(false);
  const { eventtypes, locations } = props;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const eventypesOption = eventtypes?.filter(type => type.usage !== 'admin');
  const eventypesMainOption = eventypesOption?.filter(type => type.usage === 'main');
  eventypesMainOption && eventypesMainOption.push({ value: 'more', label: '...' })

  const locationOptions = locations?.map((location) => {
    if (location.validated === false) {
      return null;
    }
    return {
      value: parseInt(location._id),
      label: location.name,
    };
  });
  locationOptions && locationOptions.push({
    value: 0,
    label: <span style={{ opacity: ".5" }}>new location</span>,
  });

  const eventtypeHandler = (e) => {
    const value = e.target.value;
    if (value == 'more') {
      setShowMore(true);
    } else {
      eventFormStore.setEventtype(value);
    }
  }

  const titleHander = (e) => {
    const value = e.target.value;
    eventFormStore.setTitle(value);
    if (value.length === 0) {
      eventFormStore.setTitleError('You need a title for your event');
    } else if (value.length < 4) {
      eventFormStore.setTitleError('This title looks a bit short');
    } else {
      eventFormStore.setTitleError(null);
    }
  }

  const locationChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div
      className={`infoform__container  ${pageStore.selectedTheme === "light"
        ? "lightColorTheme__Text"
        : "darkColorTheme__Text"
        }`}
    >
      <div className="infoform__select">
        <Radio.Group
          options={showMore ? eventypesOption : eventypesMainOption}
          optionType="button"
          onChange={eventtypeHandler}
          value={eventFormStore.eventtype}
        />
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Title</div>
        <Input
          placeholder="Name of the event"
          onChange={titleHander}
          value={eventFormStore.title}
        />
        <div className="infoform__error">
          {eventFormStore.titleError && <>{eventFormStore.titleError}</>}
        </div>
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Date & Time</div>
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YY HH:mm"
          style={{ width: "100%" }}
          needConfirm={false}
          placeholder={["Event start-date", "Event end-date"]}
        />
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Location</div>
        <Select
          showSearch
          options={locationOptions}
          onChange={locationChange}
          placeholder="Event location"
          className="eventtype__select"
        />
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Description</div>
        <TextArea
          placeholder={"Description of the event"}
          rows={8}
        />
        <div className="infoform__error">
          {eventFormStore.titleError && <>{eventFormStore.titleError}</>}
        </div>
      </div>
    </div>
  );
});
