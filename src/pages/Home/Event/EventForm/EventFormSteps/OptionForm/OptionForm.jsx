import React, { useState } from "react";

import { observer } from "mobx-react";
import { Radio, Select, Input, Row, Col } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";

import "./OptionForm.less";

export const OptionForm = observer((props) => {
  const { tags } = props;
  const [showDrescodeTags, setShowDresscodeTags] = useState(false);

  const ageOptions = [
    {
      value: 0,
      label: "No restriction",
    },
    {
      value: 18,
      label: "18+",
    },
    {
      value: 21,
      label: "21+",
    },
    {
      value: 30,
      label: "30+",
    },
  ];

  const hasDresscode = [
    {
      value: 0,
      label: "No dresscode",
    },
    {
      value: 1,
      label: "Dresscode appreciated",
    },
    {
      value: 2,
      label: "Strict dresscode",
    },
  ];

  const yesNoOptions = [
    {
      value: false,
      label: "No",
    },
    {
      value: true,
      label: "Yes",
    },
  ];

  const tagsHandler = (value) => {
    console.log(value);
  };

  const hasDresscodeHandler = (e) => {
    const value = e.target.value;
    value && setShowDresscodeTags(true);
    eventFormStore.setHasDresscode(value);
  };

  const dresscodeDoTagsHandler = (value) => {
    console.log(value);
  };

  const dresscodeDontTagsHandler = (value) => {
    console.log(value);
  };

  // Price, Lineup

  return (
    <div
      className={`optionform__container  ${
        pageStore.selectedTheme === "light"
          ? "lightColorTheme__Text"
          : "darkColorTheme__Text"
      }`}
    >
      <div className="optionform__element">
        <div className="optionform__title">Tags</div>
        <Select
          mode="tags"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select some tags"
          options={tags}
          onChange={tagsHandler}
        />
      </div>
      <div className="optionform__element">
        <div className="optionform__title">Dresscode</div>
        <Radio.Group
          options={hasDresscode}
          optionType="button"
          onChange={hasDresscodeHandler}
          value={eventFormStore.hasDresscode}
        />
      </div>
      {showDrescodeTags && (
        <div className="optionform__element">
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={12}>
              <div className="optionform__title">Dresscode allowed</div>
              <Select
                mode="tags"
                allowClear
                style={{ width: "100%" }}
                placeholder="What should people wear?"
                options={tags}
                onChange={dresscodeDoTagsHandler}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div className="optionform__title">Dresscode forbidden</div>
              <Select
                mode="tags"
                allowClear
                style={{ width: "100%" }}
                placeholder="What can't people wear?"
                options={tags}
                onChange={dresscodeDontTagsHandler}
              />
            </Col>
          </Row>
        </div>
      )}
      <div className="optionform__element">
        <div className="optionform__title">Guest minimum age</div>
        <Radio.Group
          options={ageOptions}
          optionType="button"
          onChange={(e) => eventFormStore.setAgeMin(e.target.value)}
          value={eventFormStore.ageMin}
        />
      </div>
      <div className="optionform__element">
        <div className="optionform__title">Is this a private event?</div>
        <Radio.Group
          options={yesNoOptions}
          optionType="button"
          onChange={(e) => eventFormStore.setIsPrivate(e.target.value)}
          value={eventFormStore.isPrivate}
        />
      </div>
      {eventFormStore.isPrivate && (
        <div className="optionform__element">
          <div className="optionform__title">Can be it forwarded?</div>
          <Radio.Group
            options={yesNoOptions}
            optionType="button"
            onChange={(e) => eventFormStore.setForwardable(e.target.value)}
            value={eventFormStore.forwardable}
          />
        </div>
      )}
    </div>
  );
});
