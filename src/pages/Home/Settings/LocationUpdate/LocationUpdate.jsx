import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "antd";
import { AimOutlined, CheckOutlined } from "@ant-design/icons";

import { userStore } from "../../../../store/userStore/userStore";
import { GoogleMap } from "../../../../components/GoogleMap/GoogleMap";
import { updateLocation } from "./updateLocation";
import { updateCoordinates } from "./updateCoordinates";

import "./LocationUpdate.less";

const MAP_HEIGHT = "30vh";

export const LocationUpdate = observer(() => {
  const { t } = useTranslation();
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(userStore.location);
  const [coordinates, setCoordinates] = useState(null);

  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };

  const saveLocationHandler = () => {
    updateLocation(location);
    userStore.setLocation(location);
  };

  const showMapHandler = (value) => {
    const divmap = document.getElementById("mapdiv");
    if (divmap) {
      divmap.style.height = value ? `${MAP_HEIGHT}` : 0;
      divmap.style.margin = value ? "16px 0 0 0" : 0;
    }
    setShowMap(value);
  };

  useState(() => {
    if ("geolocation" in navigator) {
      if (userStore.location === null) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoordinates(
            `${position.coords.latitude}, ${position.coords.longitude}`,
          );
          updateCoordinates(
            `${position.coords.latitude}, ${position.coords.longitude}`,
          );
        });
      }
    }
  }, []);

  useState(() => {
    showMapHandler(false);
  }, [showMap]);

  return (
    <div className="locationUpdate__container">
      <div className="locationUpdate__title EditSettings__centerDiv">
        {t("settings.changeLocation")}
      </div>
      <Input
        placeholder={t("settings.selectYourLocation")}
        value={location}
        onChange={changeLocationHandler}
        className="locationUpdate__input"
        suffix={
          <>
            <div className="locationUpdate__coordinates">{coordinates}</div>
            <AimOutlined
              className="locationUpdate__aimLogo"
              onClick={() => showMapHandler(!showMap)}
            />
          </>
        }
      />
      <Button
        type="primary"
        shape="circle"
        onClick={saveLocationHandler}
        className="locationUpdate__button"
        icon={<CheckOutlined />}
        disabled={!location || location === userStore.location}
      />
      <div className="locationUpdate__googlemap" id="mapdiv">
        <GoogleMap
          coordinates={coordinates}
          locationAddress={null}
          locationName={location}
        />
      </div>
    </div>
  );
});
