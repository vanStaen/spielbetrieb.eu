import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Steps } from "antd";

import errorLogo from "../../../../img/logos/errorLogo.png";
import { HelpButtons } from "../../../../components/HelpButtons/HelpButtons";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { authStore } from "../../../../store/authStore/authStore";
import { eventFormStore } from "./eventFormStore";
import { ArtworkForm } from "./EventFormSteps/ArtworkForm/ArtworkForm";
import { InfoForm } from "./EventFormSteps/InfoForm/InfoForm";
import { OptionForm } from "./EventFormSteps/OptionForm/OptionForm";
import { PublishForm } from "./EventFormSteps/PublishForm/PublishForm";
import { getLocations } from "../../../../store/spielplanStore/getLocations";
import { getTags } from "../../../../store/spielplanStore/getTags";
import { getAllEventtypes } from "../../../../store/spielplanStore/getAllEventtypes";
import { isMobileCheck } from "../../../../helpers/dev/checkMobileTablet";
import { nameParser } from "../../../../helpers/dev/nameParser";

import "./EventForm.less";

export const EventForm = observer(() => {
  const language = pageStore.selectedLanguage?.toLowerCase();
  const [startTour, setStartTour] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [tags, setTags] = useState(null);
  const [eventtypes, setEventtypes] = useState(null);

  const [statusSteps, setStatusSteps] = useState([
    "process",
    "wait",
    "wait",
    "wait",
  ]); // value are process, finish, error and wait

  const fetchEventtypes = async () => {
    const results = await getAllEventtypes();
    const eventtypes = results.map((type) => {
      if (type.validated === false) {
        return null;
      }
      return {
        value: parseInt(type._id),
        label: nameParser(type.name, language),
        usage: type.usage,
      };
    });
    setEventtypes(eventtypes);
  };

  const fetchLocations = async () => {
    const locations = await getLocations(true);
    setLocations(locations);
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

  const onStepsChange = (value) => {
    const tempStatusSteps = statusSteps;
    // oldStep (=formStep) should get validated and get 'Error' or 'Finish'
    if (formStep === 0) {
      if (
        eventFormStore.eventtype === null ||
        eventFormStore.title === null ||
        eventFormStore.titleError !== null ||
        eventFormStore.eventtypeError !== null ||
        eventFormStore.fromDateError !== null ||
        eventFormStore.fromDate === null ||
        eventFormStore.toDate === null
      ) {
        tempStatusSteps[formStep] = "error";
        eventFormStore.eventtype === null && eventFormStore.setEventtypeError("Please select an event type!");
        eventFormStore.title === null && eventFormStore.setTitleError("You need a title for your event!");
        eventFormStore.fromDate === null && eventFormStore.setFromDateError("Please input start and end time of your event!");
        eventFormStore.toDate === null && eventFormStore.setFromDateError("Please input start and end time of your event!");
      } else {
        tempStatusSteps[formStep] = "finish";
      }
    } else if (formStep === 1) {
      if (eventFormStore.artworks.length === 0) {
        eventFormStore.setArtworksError("Please upload at least one artwork for your event!");
        tempStatusSteps[formStep] = "error";
      } else {
        tempStatusSteps[formStep] = "finish";
      }
    }
    // newStep (=value) is now 'process'
    tempStatusSteps[value] = "process";
    setFormStep(value);
    setStatusSteps(tempStatusSteps);
  };

  const naviguateHandler = (next) => {
    if (next && formStep === 3) {
      console.error('there is only 4 steps');
      return;
    }
    else if (!next && formStep === 0) {
      console.error('it was already the first step');
      return;
    }
    const newStep = next ? formStep + 1 : formStep - 1;
    onStepsChange(newStep);
  }

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
                title: "General Infos",
                status: statusSteps[0],
              },
              {
                title: "Artworks",
                status: statusSteps[1],
              },
              {
                title: "Options",
                status: statusSteps[2],
              },
              {
                title: "Publish",
                status: statusSteps[3],
              },
            ]}
          />
          <div className="eventform__spacer"></div>
          {formStep === 0 && (
            <InfoForm eventtypes={eventtypes} locations={locations} />
          )}
          {formStep === 1 && <ArtworkForm />}
          {formStep === 2 && <OptionForm tags={tags} />}
          {formStep === 3 && <PublishForm />}
        </div>
      ) : (
        <div className="eventform__singupfirst">
          <img
            src={errorLogo}
            width="50px"
            className="eventform__singupfirstImg invertColorTheme "
          />
          <div
            className={`eventform__singupfirstText ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
            onClick={() => {
              document.location.href = "/login";
            }}
          >
            <div>You need to be logged in!</div>
            <div>
              Click on the <UserOutlined className="eventform__avatarlogo" />,
              in the top right corner, to log in or sign up.
            </div>
          </div>
        </div>
      )}
      <div className="eventform__navigation">
        <Button
          className="eventform__navButtons"
          onClick={() => { naviguateHandler(false) }}
          disabled={formStep === 0}
        >
          Previous
        </Button>
        <Button
          className="eventform__navButtons"
          onClick={() => { naviguateHandler(true) }}
          disabled={formStep === 3}
        >
          Next
        </Button>
      </div>
    </>
  );
});
