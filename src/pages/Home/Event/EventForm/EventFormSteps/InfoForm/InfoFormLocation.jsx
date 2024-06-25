import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { AimOutlined } from "@ant-design/icons";
import { Input, Row, Col, AutoComplete } from "antd";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { spielplanStore } from "../../../../../../store/spielplanStore/spielplanStore";
import { GoogleMap } from "../../../../../../components/GoogleMap/GoogleMap";

const MAP_HEIGHT = "30vh";

export const InfoFormLocation = observer(() => {
  const [showMap, setShowMap] = useState(false);
  const { t } = useTranslation();

  const locationOptions = spielplanStore.locations?.map((location) => {
    return {
      value: location.name,
    };
  });

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
          locationAddress: eventFormStore.locationAddress,
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
    <div className="infoform__element">
      <div className="infoform__title">{t("eventform.location")}</div>
      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12}>
          <AutoComplete
            value={eventFormStore.locationName}
            options={locationOptions}
            placeholder={t("eventform.locationName")}
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
            placeholder={t("eventform.locationAddress")}
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
  );
});
