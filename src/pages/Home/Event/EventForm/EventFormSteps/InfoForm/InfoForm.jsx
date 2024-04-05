import React from "react";
import { observer } from "mobx-react";
import { Radio } from 'antd';

import { eventFormStore } from "../../eventFormStore";

import "./InfoForm.less";

export const InfoForm = observer((props) => {
  const { eventtypes } = props;

  console.log(eventtypes);

  return (
    <>
      <Radio.Group
        options={eventtypes}
        optionType="button"
      />
      <div>Eventtype*</div>
      <div>Title*</div>
      <div>Title*</div>
      <div>Datefrom</div>
      <div>Dateto</div>
      <div>Location</div>
      <div>Coordinates</div>
    </>
  );
});
