import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { UserOutlined } from "@ant-design/icons";
import { Steps } from "antd";

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
import { getDresscodes } from "../../../../store/spielplanStore/getDresscodes";
import { getEquipments } from "../../../../store/spielplanStore/getEquipments";
import { getArtists } from "../../../../store/spielplanStore/getArtists";
import { getAllEventtypes } from "../../../../store/spielplanStore/getAllEventtypes";
import { isMobileCheck } from "../../../../helpers/dev/checkMobileTablet";
import { nameParser } from "../../../../helpers/dev/nameParser";
import { EventFormNavigation } from "./EventFormNavigation/EventFormNavigation";
import { CustomSpinner } from "../../../../components/CustomSpinner/CustomSpinnner";
import { EventFormDraftModal } from "./EventFormDraftModal/EventFormDraftModal";

import "./EventForm.less";

export const EventForm = observer(() => {
  const language = pageStore.selectedLanguage?.toLowerCase();
  const [startTour, setStartTour] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [tags, setTags] = useState(null);
  const [eventtypes, setEventtypes] = useState(null);
  const [dresscodes, setDresscodes] = useState(null);
  const [equipments, setEquipments] = useState(null);
  const [artists, setArtists] = useState(null);
  const [showDraftModal, setShowDraftModal] = useState(false);

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

  const fetchTags = async () => {
    const results = await getTags();
    const tags = results.map((tag) => {
      if (tag.eventTag === false) {
        return null;
      }
      return {
        value: parseInt(tag._id),
        label: nameParser(tag.name, language),
        validated: tag.validated,
      };
    });
    setTags(tags);
  };

  const fetchDresscodes = async () => {
    const results = await getDresscodes();
    const dresscodes = results.map((dresscode) => {
      return {
        value: parseInt(dresscode._id),
        label: nameParser(dresscode.name, language),
        validated: dresscode.validated,
      };
    });
    setDresscodes(dresscodes);
  };

  const fetchEquipments = async () => {
    const results = await getEquipments();
    const equipements = results?.map((equipement) => {
      return {
        value: parseInt(equipement._id),
        label: nameParser(equipement.name, language),
        validated: equipement.validated,
      };
    });
    setEquipments(equipements);
  };

  const fetchArtists = async () => {
    const results = await getArtists();
    const artists = results.map((artist) => {
      return {
        value: parseInt(artist._id),
        label: artist.name,
        validated: artist.validated,
      };
    });
    setArtists(artists);
  };

  const fetchAll = async () => {
    setIsLoading(true);
    await fetchEventtypes();
    await fetchLocations();
    await fetchTags();
    await fetchDresscodes();
    await fetchEquipments();
    await fetchArtists();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [pageStore.selectedLanguage]);

  const onStepsChange = (value) => {
    const tempStatusSteps = statusSteps;
    // oldStep (=eventFormStore.formStep) should get validated and get 'Error' or 'Finish'
    if (eventFormStore.formStep === 0) {
      if (
        eventFormStore.eventtype === null ||
        eventFormStore.title === null ||
        eventFormStore.titleError !== null ||
        eventFormStore.eventtypeError !== null ||
        eventFormStore.fromDateError !== null ||
        eventFormStore.fromDate === null ||
        eventFormStore.toDate === null
      ) {
        tempStatusSteps[eventFormStore.formStep] = "error";
        eventFormStore.eventtype === null &&
          eventFormStore.setEventtypeError("Please select an event type!");
        eventFormStore.title === null &&
          eventFormStore.setTitleError("You need a title for your event!");
        eventFormStore.fromDate === null &&
          eventFormStore.setFromDateError(
            "Please input start and end time of your event!",
          );
        eventFormStore.toDate === null &&
          eventFormStore.setFromDateError(
            "Please input start and end time of your event!",
          );
      } else {
        tempStatusSteps[eventFormStore.formStep] = "finish";
      }
    } else if (eventFormStore.formStep === 1) {
      if (eventFormStore.artworks.length === 0) {
        eventFormStore.setArtworksError(
          "Please upload at least one artwork for your event!",
        );
        tempStatusSteps[eventFormStore.formStep] = "error";
      } else {
        tempStatusSteps[eventFormStore.formStep] = "finish";
      }
    }
    // newStep (=value)
    if (value === 3) {
      if (eventFormStore.artworks.length === 0) {
        eventFormStore.setArtworksError(
          "Please upload at least one artwork for your event!",
        );
        tempStatusSteps[1] = "error";
        tempStatusSteps[3] = "error";
      } else {
        eventFormStore.setArtworksError(null);
        tempStatusSteps[1] = "finish";
        tempStatusSteps[3] = "process";
      }
      if (tempStatusSteps[0] === "error") {
        tempStatusSteps[3] = "error";
      } else {
        tempStatusSteps[3] = "process";
      }
    } else if (value === 2) {
      if (eventFormStore.artworks.length === 0) {
        eventFormStore.setArtworksError(
          "Please upload at least one artwork for your event!",
        );
        tempStatusSteps[1] = "error";
      } else {
        tempStatusSteps[1] = "finish";
      }
    }
    eventFormStore.setFormStep(value);
    setStatusSteps(tempStatusSteps);
  };

  return isLoading ? (
    <div className="eventform__singupfirst">
      <CustomSpinner text="Loading" />
    </div>
  ) : (
    <>
      <EventFormDraftModal
        showDraftModal={showDraftModal}
        setShowDraftModal={setShowDraftModal}
        eventtypes={eventtypes}
      />
      <HelpButtons setStartTour={setStartTour} />
      {authStore.hasAccess ? (
        <div className="eventform__container">
          <Steps
            size={isMobileCheck() && "small"}
            type={isMobileCheck() ? "inline" : "default"}
            status="error"
            onChange={onStepsChange}
            current={eventFormStore.formStep}
            className="eventform__steps"
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
          {eventFormStore.formStep === 0 && (
            <InfoForm eventtypes={eventtypes} locations={locations} />
          )}
          {eventFormStore.formStep === 1 && <ArtworkForm />}
          {eventFormStore.formStep === 2 && (
            <OptionForm
              artists={artists}
              fetchArtists={fetchArtists}
              tags={tags}
              fetchTags={fetchTags}
              dresscodes={dresscodes}
              fetchDresscodes={fetchDresscodes}
              equipments={equipments}
            />
          )}
          {eventFormStore.formStep === 3 && <PublishForm />}
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
      {authStore.hasAccess && !showDraftModal && (
        <EventFormNavigation onStepsChange={onStepsChange} />
      )}
    </>
  );
});
