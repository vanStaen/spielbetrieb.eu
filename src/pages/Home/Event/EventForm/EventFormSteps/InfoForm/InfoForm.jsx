import React, { useState } from "react";
import { observer } from "mobx-react";
import { Radio, Input } from 'antd';

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from '../../../../../../store/pageStore/pageStore';

import "./InfoForm.less";

export const InfoForm = observer((props) => {
  const [showMore, setShowMore] = useState(false);
  const { eventtypes } = props;

  const eventypesOption = eventtypes?.filter(type => type.usage !== 'admin');
  const eventypesMainOption = eventypesOption?.filter(type => type.usage === 'main');
  eventypesMainOption && eventypesMainOption.push({ value: 'more', label: '...' })

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
    if (value.length < 4) {
      eventFormStore.setTitleError('a bit short');
    } else {
      eventFormStore.setTitleError(null);
    }
  }

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
      <div className="infoform__element">Title
        <Input
          placeholder="Name of the event"
          onChange={titleHander}
          value={eventFormStore.title}
        />
        {eventFormStore.titleError && <>{eventFormStore.titleError}</>}
      </div>
      <div className="infoform__element">Datefrom</div>
      <div className="infoform__element">Dateto</div>
      <div className="infoform__element">Location</div>
      <div className="infoform__element">Coordinates</div>
      <div className="infoform__element">Description</div>
    </div>
  );
});
