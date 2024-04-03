import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { UserOutlined } from "@ant-design/icons";
import { Steps } from "antd";

import errorLogo from "../../../../img/logos/errorLogo.png";
import { HelpButtons } from "../../../../components/HelpButtons/HelpButtons";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { authStore } from "../../../../store/authStore/authStore";

import { ArtworkForm } from "./EventFormSteps/ArtworkForm";
import { InfoForm } from "./EventFormSteps/InfoForm";
import { OptionForm } from "./EventFormSteps/OptionForm";
import { GuestForm } from "./EventFormSteps/GuestForm";
import { getLocations } from "../../../../store/spielplanStore/getLocations";
import { getTags } from "../../../../store/spielplanStore/getTags";
import { getEventtypes } from "../../../../store/spielplanStore/getEventtypes";
import { isMobileCheck } from "../../../../helpers/checkMobileTablet";
import { nameParser } from "../../../../helpers/nameParser";

import "./EventForm.less";

export const EventForm = observer(() => {
  const language = pageStore.selectedLanguage?.toLowerCase();
  const [startTour, setStartTour] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [locationOptions, setLocationOptions] = useState(null);
  const [tags, setTags] = useState(null);
  const [eventtypes, setEventtypes] = useState(null);

  const [statusSteps, setStatusSteps] = useState([
    "process",
    "wait",
    "wait",
    "wait",
  ]); // value are process, finish, error and wait

  const fetchEventtypes = async () => {
    const results = await getEventtypes();
    const eventtypes = results.map((type) => {
      if (type.validated === false) {
        return null;
      }
      return {
        value: parseInt(type._id),
        label: nameParser(type.name, language),
      };
    });
    setEventtypes(eventtypes);
  };

  const fetchLocations = async () => {
    const locations = await getLocations();
    const locationOptions = locations.map((location) => {
      if (location.validated === false) {
        return null;
      }
      return {
        value: parseInt(location._id),
        label: location.name,
      };
    });
    locationOptions.push({
      value: 0,
      label: <span style={{ opacity: ".5" }}>new location</span>,
    });
    setLocations(locations);
    setLocationOptions(locationOptions);
  };

  const fetchtags = async () => {
    const results = await getTags();
    const tags = results.map((tag) => {
      if (tag.validated === false || tag.eventTag === false) {
        return null;
      }
      return {
        value: parseInt(tag._id),
        label: nameParser(tag.name, language),
      };
    });
    setTags(tags);
  };

  useEffect(() => {
    fetchEventtypes();
    fetchLocations();
    fetchtags();
  }, [pageStore.selectedLanguage]);

  /*
    TODO: 
    pictures: [String]
    locationCoordinates: String
    attendees: [Int]
    invited: [Int]
    admin: [Int]
  */

  const onStepsChange = (value) => {
    console.log("onChange:", value);
    // oldStep (=formStep) shoudl get vaidated, and get 'Error' or 'Finish'
    // newStep (=value) is now 'process'
    const tempStatusSteps = statusSteps;
    tempStatusSteps[value] = "process";
    setFormStep(value);
    setStatusSteps(tempStatusSteps);
  };

  return (
    <>
      <HelpButtons setStartTour={setStartTour} />
      {authStore.hasAccess ? (
        <div className="eventform__container">
          <Steps
            size={isMobileCheck() && "small"}
            type={isMobileCheck() ? "inline" : "default"}
            status="error"
            onChange={onStepsChange}
            current={formStep}
            items={[
              {
                title: "Artworks",
                status: statusSteps[0],
              },
              {
                title: "General Infos",
                status: statusSteps[1],
              },
              {
                title: "Optionals",
                status: statusSteps[2],
              },
              {
                title: "Guest",
                status: statusSteps[3],
              },
            ]}
          />
          <div style={{ marginTop: 32 }}></div>
          {formStep === 0 && <ArtworkForm />}
          {formStep === 1 && <InfoForm />}
          {formStep === 2 && <OptionForm />}
          {formStep === 3 && <GuestForm />}
        </div>
      ) : (
        <div className="eventform__singupfirst">
          <img
            src={errorLogo}
            width="50px"
            className="eventform__singupfirstImg"
          />
          <div
            className={`eventform__singupfirstText ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
            onClick={() => {
              document.location.href = "/login";
            }}
          >
            <div>You need to be logged in!</div>
            <div>
              Click on the <UserOutlined /> - top right corner - to log in or
              sign up.
            </div>
          </div>
        </div>
      )}
    </>
  );
});
