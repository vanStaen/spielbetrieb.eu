import React from "react";
import { observer } from "mobx-react";
import { Radio } from 'antd';

import { eventFormStore } from "../../eventFormStore";

import "./InfoForm.less";

export const InfoForm = observer((props) => {
  const { eventtypes } = props;

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', title: 'Orange' },
  ];

  console.log(eventtypes)

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
