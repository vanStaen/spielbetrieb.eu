import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { Radio, Select, InputNumber, Row, Col, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { addOption } from "./addOption";
import {
  priceOptions,
  ageOptions,
  hasDresscode,
  yesNoOptions,
} from "./optionFormData";

import "./OptionForm.less";

export const OptionForm = observer((props) => {
  const {
    tags,
    fetchTags,
    dresscodes,
    fetchDresscodes,
    equipments,
    artists,
    fetchArtists,
  } = props;

  const tagsHandler = async (value) => {
    const tagArray = await Promise.all(
      value.map(async (tag) => {
        if (typeof tag === "string") {
          const newTagId = await addOption(tag, "tag");
          await fetchTags();
          return newTagId;
        }
        return tag;
      }),
    );
    eventFormStore.setEventTags(tagArray);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        eventTags: tagArray,
      });
  };

  const equipmentHandler = (value) => {
    eventFormStore.setEquipment(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        equipment: value,
      });
  };

  const lineUpHandler = async (value) => {
    const lineUpArray = await Promise.all(
      value.map(async (artist) => {
        if (typeof artist === "string") {
          const newArtistId = await addOption(artist, "artist");
          await fetchArtists();
          return newArtistId;
        }
        return artist;
      }),
    );
    eventFormStore.setLineUp(lineUpArray);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        lineUp: lineUpArray,
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
    eventFormStore.setDresscodeDoTags(dresscodeDontTagArray);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        dresscodeDoTags: dresscodeDontTagArray,
      });
  };

  const priceHandler = (value, index) => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject[index].amount = value;
    console.log(tempPricesObject);
    eventFormStore.setPrices(tempPricesObject);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        prices: JSON.stringify(tempPricesObject),
      });
  };

  const priceOptionHandler = (value, index) => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject[index].option = value;
    eventFormStore.setPrices(tempPricesObject);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        prices: JSON.stringify(tempPricesObject),
      });
  };

  const handleAddPrice = () => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject.push({ amount: null, option: null });
    eventFormStore.setPrices(tempPricesObject);
  };

  const handleDeletePrice = (index) => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject.splice(index, 1);
    eventFormStore.setPrices(tempPricesObject);
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

      {eventFormStore.eventtype !== 21 && ( // no prices for dates
        <div className="optionform__element">
          <div className="optionform__title">Prices</div>
          <Row gutter={[16, 8]}>
            {eventFormStore.prices.map((price, index) => {
              return (
                <Fragment key={`priceRow${index}`}>
                  <Col xs={7} sm={7} md={4} key={`col-amount-${index}`}>
                    <InputNumber
                      prefix="€"
                      placeholder="Price"
                      onChange={(event) => priceHandler(event, index)}
                      value={price.amount}
                      onFocus={() => eventFormStore.setDeactivateNav(true)}
                      onBlur={() => eventFormStore.setDeactivateNav(false)}
                    />
                  </Col>
                  <Col xs={17} sm={17} md={20} key={`col-option-${index}`}>
                    <Select
                      value={price.option}
                      options={priceOptions}
                      placeholder="Price type"
                      onChange={(event) => priceOptionHandler(event, index)}
                      disabled={index === 0 || !price.amount}
                      className="optionform__priceSelect"
                      onFocus={() => eventFormStore.setDeactivateNav(true)}
                      onBlur={() => eventFormStore.setDeactivateNav(false)}
                    />
                    {index ? (
                      <Button
                        className="optionform__deletePriceButton"
                        onClick={() => handleDeletePrice(index)}
                        disabled={!price.amount}
                      >
                        <DeleteOutlined />
                      </Button>
                    ) : (
                      <Button
                        className="optionform__priceButton"
                        onClick={handleAddPrice}
                        disabled={
                          !price.amount ||
                          eventFormStore.prices.length === priceOptions.length
                        }
                      >
                        <PlusOutlined />
                      </Button>
                    )}
                  </Col>
                </Fragment>
              );
            })}
          </Row>
        </div>
      )}

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
                options={dresscodes}
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
                options={dresscodes}
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

      <div className="optionform__element">
        <div className="optionform__title">Line up</div>
        <Select
          mode="tags"
          allowClear
          style={{ width: "100%" }}
          placeholder="Line Up of your event, if any"
          options={artists}
          onChange={lineUpHandler}
          value={eventFormStore.lineUp}
          filterOption={(inputValue, option) =>
            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          onBlur={() => eventFormStore.setDeactivateNav(false)}
        />
      </div>

      {/* only show equipment for play events */}
      {(eventFormStore.eventtype === 42 ||
        eventFormStore.eventtype === 40 ||
        eventFormStore.eventtype === null) && (
          <div className="optionform__element">
            <div className="optionform__title">Play equipment</div>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Does your event has any furniture/accessories?"
              options={equipments}
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
        )}

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
