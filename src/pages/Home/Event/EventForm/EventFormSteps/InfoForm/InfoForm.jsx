import React, { useState } from "react";
import { observer } from "mobx-react";
import { Radio } from 'antd';

import { eventFormStore } from "../../eventFormStore";

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

  return (
    <>
      <Radio.Group
        options={showMore ? eventypesOption : eventypesMainOption}
        optionType="button"
        onChange={eventtypeHandler}
      />
      <div>Eventtype*</div>
      <div>Title*</div>
      <div>Description</div>
      <div>Datefrom</div>
      <div>Dateto</div>
      <div>Location</div>
      <div>Coordinates</div>
    </>
  );
});
