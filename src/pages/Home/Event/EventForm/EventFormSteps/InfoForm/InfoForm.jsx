import React, { useState } from "react";
import { observer } from "mobx-react";
import { Radio, Input, DatePicker, Row, Col, AutoComplete } from "antd";
import { AimOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { GoogleMap } from './GoogleMap';

import "./InfoForm.less";

const MAP_HEIGHT_IN_PX = 300;

export const InfoForm = observer((props) => {
  const [showMore, setShowMore] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { eventtypes, locations } = props;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const eventypesOption = eventtypes?.filter((type) => type.usage !== "admin");
  const eventypesMainOption = eventypesOption?.filter(
    (type) => type.usage === "main",
  );
  eventypesMainOption &&
    eventypesMainOption.push({ value: "more", label: "..." });

  // console.log('locations', locations);
  const locationOptions = locations?.map((location) => {
    // do this in the backend
    if (location.validated === false) {
      return null;
    }
    return {
      value: location.name,
    };
  });

  const eventtypeHandler = (e) => {
    const value = e.target.value;
    if (value === "more") {
      setShowMore(true);
    } else {
      eventFormStore.setEventtype(value);
      eventFormStore.setEventtypeError(null);
    }
  };

  const titleHander = (e) => {
    const value = e.target.value;
    eventFormStore.setTitle(value);
    if (value.length === 0) {
      eventFormStore.setTitleError("You need a title for your event!");
    } else if (value.length < 4) {
      eventFormStore.setTitleError("This title looks a bit short!");
    } else {
      eventFormStore.setTitleError(null);
    }
    if (!eventFormStore.eventtype) {
      eventFormStore.setEventtypeError("Please select an event type!");
    } else {
      // Create event as Draft
    }
  };

  const dateHandler = (dates) => {
    if (dates[0].valueOf() >= dates[1].valueOf()) {
      eventFormStore.setFromDateError(
        "The event can not end before it has started!",
      );
    } else if (dates[0] < dayjs()) {
      eventFormStore.setFromDateError("An event can not start in the past!");
    } else {
      eventFormStore.setFromDateError(null);
    }
    eventFormStore.setFromDate(dates[0]);
    eventFormStore.setUntilDate(dates[1]);
  };

  const locationNameHander = (value) => {
    eventFormStore.setLocationName(value);
  };

  const locationNameBlurHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setLocationId(null);
    eventFormStore.setLocationAddress(null);
    eventFormStore.setIsNewLocation(true);
    console.log('blur', value);
  }

  const locationNameSelectHandler = (value) => {
    const selectedLocation = locations.filter(location => location.name === value)[0];
    eventFormStore.setIsNewLocation(false);
    eventFormStore.setLocationId(selectedLocation._id);
    eventFormStore.setLocationName(selectedLocation.name);
    eventFormStore.setLocationAddress(selectedLocation.address);
  }


  const locationAddressHander = (e) => {
    const value = e.target.value;
    eventFormStore.setLocationAddress(value);
  };

  const showMapHandler = () => {
    const divmap = document.getElementById("mapdiv");
    divmap.style.height = showMap ? 0 : `${MAP_HEIGHT_IN_PX}px`;
    setShowMap(!showMap);
    setTimeout(function () {
      //show map?
    }, 300);
  }

  const descHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setDescription(value);
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
        <div className="infoform__error">
          {eventFormStore.eventtypeError && (
            <>{eventFormStore.eventtypeError}</>
          )}
        </div>
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
          allowEmpty={[false, false]}
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YY HH:mm"
          style={{ width: "100%" }}
          needConfirm={false}
          placeholder={["Event start-date", "Event end-date"]}
          onChange={dateHandler}
          value={[eventFormStore.fromDate, eventFormStore.untilDate]}
        />
        <div className="infoform__error">
          {eventFormStore.fromDateError && <>{eventFormStore.fromDateError}</>}
        </div>
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Location</div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <AutoComplete
              value={eventFormStore.locationName}
              options={locationOptions}
              placeholder="Name"
              onChange={locationNameHander}
              onBlur={locationNameBlurHandler}
              onSelect={locationNameSelectHandler}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Input
              placeholder="Address"
              onChange={locationAddressHander}
              value={eventFormStore.locationAddress}
              disabled={!eventFormStore.isNewLocation}
              suffix={<AimOutlined className="infoform__coordinates" onClick={showMapHandler} />}
            />
            <div className="infoform__error">
              {eventFormStore.locationAddressError && (
                <>{eventFormStore.locationAddressError}</>
              )}
            </div>
          </Col>
        </Row>
        <div className="infoform__googlemap" id='mapdiv'>
          <GoogleMap
            coordinates={eventFormStore.locationCoordinates} />
        </div>
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Description</div>
        <TextArea
          placeholder={"Description of the event"}
          value={eventFormStore.description}
          rows={8}
          onChange={descHandler}
        />
      </div>
    </div>
  );
});
