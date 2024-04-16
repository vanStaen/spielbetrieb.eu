import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Radio,
  Input,
  DatePicker,
  Row,
  Col,
  AutoComplete,
  message,
  notification,
} from "antd";
import { AimOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { GoogleMap } from "./GoogleMap";
import { addEvent } from "../../../../../Admin/AdminEvents/addEvent";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { spielplanStore } from "../../../../../../store/spielplanStore/spielplanStore";

import "./InfoForm.less";

const MAP_HEIGHT = "30vh";

export const InfoForm = observer((props) => {
  const [showMore, setShowMore] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { eventtypesOptions } = props;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const eventypesOption = eventtypesOptions?.filter(
    (type) => type.usage !== "admin",
  );
  const eventypesMainOption = eventypesOption?.filter((type) => {
    const hasToBeShown = type.value === eventFormStore.eventtype;
    return type.usage === "main" || hasToBeShown;
  });
  eventypesMainOption &&
    eventypesMainOption.push({ value: "more", label: "..." });

  const locationOptions = spielplanStore.locations?.map((location) => {
    return {
      value: location.name,
    };
  });

  const createDraftEvent = async (eventtype, title) => {
    if (eventFormStore.eventId) {
      return;
    }
    const dataObject = {
      eventtype,
      title,
    };
    try {
      const res = await addEvent(dataObject);
      eventFormStore.setEventId(res._id);
      message.success("Draft saved!");
    } catch (e) {
      notification.error({
        message: "Error!",
        description: e.toString(),
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
  };

  const eventtypeHandler = (e) => {
    const value = e.target.value;
    if (value === "more") {
      setShowMore(true);
    } else {
      if (eventFormStore.eventId) {
        updateEvent(eventFormStore.eventId, {
          eventtype: value,
        });
      } else if (value && eventFormStore.title) {
        createDraftEvent(value, eventFormStore.title);
      }
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
    }
  };

  const titleBlurHandler = () => {
    eventFormStore.setDeactivateNav(false);
    if (eventFormStore.eventId) {
      updateEvent(eventFormStore.eventId, {
        title: eventFormStore.title,
      });
    } else if (eventFormStore.eventtype && eventFormStore.title) {
      createDraftEvent(eventFormStore.eventtype, eventFormStore.title);
    }
  };

  const disabledDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= 7;
    }
    return false;
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
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        fromDate: dates[0].valueOf(),
        untilDate: dates[1].valueOf(),
      });
  };

  const locationNameHander = (value) => {
    eventFormStore.setLocationName(value);
  };

  const locationNameBlurHandler = (e) => {
    eventFormStore.setDeactivateNav(false);
    const value = e.target.value;
    const selectedLocation = spielplanStore.locations.filter(
      (location) => location.name === value,
    )[0];
    if (selectedLocation === undefined) {
      eventFormStore.setLocationId(null);
      // eventFormStore.setLocationAddress(null);
      value && eventFormStore.setIsNewLocation(true);
      value && showMapHandler(true);
      eventFormStore.eventId &&
        updateEvent(eventFormStore.eventId, {
          locationName: eventFormStore.locationName,
        });
    }
  };

  const locationNameSelectHandler = (value) => {
    const selectedLocation = spielplanStore.locations.filter(
      (location) => location.name === value,
    )[0];
    eventFormStore.setIsNewLocation(false);
    eventFormStore.setLocationId(selectedLocation._id);
    eventFormStore.setLocationName(selectedLocation.name);
    eventFormStore.setLocationAddress(selectedLocation.address);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        location: parseInt(eventFormStore.locationId),
        locationName: eventFormStore.locationName,
        locationAddress: eventFormStore.locationAddress,
      });
  };

  const locationAddressHander = (e) => {
    const value = e.target.value;
    eventFormStore.setLocationAddress(value);
  };

  const locationAddressBlurHander = () => {
    eventFormStore.setDeactivateNav(false);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        locationAddress: eventFormStore.locationAddress,
      });
  };

  const descHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setDescription(value);
  };

  const descBlurHandler = () => {
    eventFormStore.setDeactivateNav(false);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        description: eventFormStore.description,
      });
  };

  const showMapHandler = (value) => {
    const divmap = document.getElementById("mapdiv");
    divmap.style.height = value ? `${MAP_HEIGHT}` : 0;
    divmap.style.margin = value ? "16px 0 0 0" : 0;
    setShowMap(value);
  };

  useEffect(() => {
    if (!eventFormStore.locationName) {
      eventFormStore.setIsNewLocation(false);
      eventFormStore.setLocationAddress(null);
    }
    if (!eventFormStore.locationName && !eventFormStore.locationAddress) {
      showMapHandler(false);
    }
  }, [eventFormStore.locationName, eventFormStore.locationAddress]);

  return (
    <div
      className={`infoform__container  ${
        pageStore.selectedTheme === "light"
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
          onBlur={titleBlurHandler}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
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
          disabledDate={disabledDate}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          onBlur={() => eventFormStore.setDeactivateNav(false)}
          value={[eventFormStore.fromDate, eventFormStore.untilDate]}
        />
        <div className="infoform__error">
          {eventFormStore.fromDateError && <>{eventFormStore.fromDateError}</>}
        </div>
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Location</div>
        <Row gutter={[16, 8]}>
          <Col xs={24} sm={24} md={12}>
            <AutoComplete
              value={eventFormStore.locationName}
              options={locationOptions}
              placeholder="Name"
              onChange={locationNameHander}
              onBlur={locationNameBlurHandler}
              onFocus={() => eventFormStore.setDeactivateNav(true)}
              onSelect={locationNameSelectHandler}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Input
              placeholder="Address"
              onChange={locationAddressHander}
              onBlur={locationAddressBlurHander}
              onFocus={() => eventFormStore.setDeactivateNav(true)}
              value={eventFormStore.locationAddress}
              disabled={!eventFormStore.isNewLocation}
              suffix={
                <AimOutlined
                  className={
                    eventFormStore.locationName
                      ? "infoform__coordinates"
                      : "infoform__coordinatesDisabled"
                  }
                  onClick={() => showMapHandler(!showMap)}
                />
              }
            />
            <div className="infoform__error">
              {eventFormStore.locationAddressError && (
                <>{eventFormStore.locationAddressError}</>
              )}
            </div>
          </Col>
        </Row>
        <div className="infoform__googlemap" id="mapdiv">
          <GoogleMap
            coordinates={eventFormStore.locationCoordinates}
            locationAddress={eventFormStore.locationAddress}
            locationName={eventFormStore.locationName}
          />
        </div>
      </div>
      <div className="infoform__element">
        <div className="infoform__title">Description</div>
        <TextArea
          placeholder={"Description of the event"}
          value={eventFormStore.description}
          rows={8}
          onChange={descHandler}
          onBlur={descBlurHandler}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
        />
      </div>
    </div>
  );
});
