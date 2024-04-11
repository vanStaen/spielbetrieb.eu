import React, { useState } from "react";

import { observer } from "mobx-react";
import { Radio, Select, InputNumber, Row, Col, Button } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { priceOptions, lineUpOptions, ageOptions, hasDresscode, yesNoOptions } from './optionFormData';

import "./OptionForm.less";

export const OptionForm = observer((props) => {
  const { tags } = props;

  const tagsHandler = (value) => {
    eventFormStore.setEventTags(value);
    //TODO: New tag process
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        eventTags: value,
      });
  };

  const lineUpHandler = (value) => {
    eventFormStore.setLineUp(value);
    //TODO: New line up process
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        lineUp: value,
      });
  };

  const equipmentHandler = (value) => {
    eventFormStore.setEquipment(value);
    //TODO: New equipment process
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        equipment: value,
      });
  };

  const linksHandler = (value) => {
    eventFormStore.setLinks(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        links: value,
      });
  };

  const ageMinHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setAgeMin(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        ageMin: value,
      });
  };

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

  const hasDresscodeHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setHasDresscode(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        hasDresscode: value,
      });
  };

  const dresscodeDoTagsHandler = (value) => {
    // TODO
    console.log(value);
  };

  const dresscodeDontTagsHandler = (value) => {
    // TODO
    console.log(value);
  };

  const priceHandler = (value, key) => {
    // TODO
    console.log("price", value, key);
  };

  const priceOptionHandler = (value, key) => {
    // TODO
    console.log("option", value, key);
  };

  return (
    <div
      className={`optionform__container  ${pageStore.selectedTheme === "light"
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
          value={eventFormStore.eventTags}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          onBlur={() => eventFormStore.setDeactivateNav(false)}
          filterOption={(inputValue, option) =>
            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>

      <div className="optionform__element">
        <div className="optionform__title">Links</div>
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Add links to your event"
          onChange={linksHandler}
          value={eventFormStore.links}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          onBlur={() => eventFormStore.setDeactivateNav(false)}
        />
      </div>

      <div className="optionform__element">
        <div className="optionform__title">Prices</div>
        <Row gutter={[16, 8]}>
          <Col xs={7} sm={7} md={4}>
            <InputNumber
              prefix="€"
              placeholder="Price"
              onChange={(event) => priceHandler(event, 1)}
              value={null}
              onFocus={() => eventFormStore.setDeactivateNav(true)}
              onBlur={() => eventFormStore.setDeactivateNav(false)}
            />
          </Col>
          <Col xs={17} sm={17} md={20}>
            <Select
              value={!eventFormStore.price ? 0 : null}
              options={priceOptions}
              placeholder="Price type"
              onChange={priceOptionHandler}
              disabled={!eventFormStore.price?.value}
              className="optionform__priceSelect"
              onFocus={() => eventFormStore.setDeactivateNav(true)}
              onBlur={() => eventFormStore.setDeactivateNav(false)}
            />
            <Button className="optionform__priceButton" disabled={true}>
              +
            </Button>
          </Col>
        </Row>
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
                options={tags}
                onChange={dresscodeDoTagsHandler}
                onFocus={() => eventFormStore.setDeactivateNav(true)}
                onBlur={() => eventFormStore.setDeactivateNav(false)}
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
                onFocus={() => eventFormStore.setDeactivateNav(true)}
                onBlur={() => eventFormStore.setDeactivateNav(false)}
              />
            </Col>
          </Row>
        </div>
      )}

      <div className="optionform__element">
        <div className="optionform__title">Line up</div>
        <Select
          mode="tags"
          allowClear
          style={{ width: "100%" }}
          placeholder="Line Up of your event, if any"
          options={lineUpOptions}
          onChange={lineUpHandler}
          value={eventFormStore.lineUp}
          filterOption={(inputValue, option) =>
            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          onBlur={() => eventFormStore.setDeactivateNav(false)}
        />
      </div>

      <div className="optionform__element">
        <div className="optionform__title">Equipment</div>
        {/* TODO: add equipment list */}
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Does your event has any furniture/accessories?"
          onChange={equipmentHandler}
          value={eventFormStore.equipment}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          onBlur={() => eventFormStore.setDeactivateNav(false)}
        />
      </div>

      <div className="optionform__element">
        <div className="optionform__title">Guest minimum age</div>
        <Radio.Group
          options={ageOptions}
          optionType="button"
          onChange={ageMinHandler}
          value={eventFormStore.ageMin}
        />
      </div>

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
    </div>
  );
});
