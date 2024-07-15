import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { UserOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import { useTranslation } from "react-i18next";

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
import { getTags } from "../../../../store/pageStore/getTags";
import { getDresscodes } from "../../../../store/spielplanStore/getDresscodes";
import { getEquipments } from "../../../../store/spielplanStore/getEquipments";
import { getArtists } from "../../../../store/spielplanStore/getArtists";
import { getAllEventtypes } from "../../../../store/spielplanStore/getAllEventtypes";
import { isMobileCheck } from "../../../../helpers/dev/checkMobileTablet";
import { nameParser } from "../../../../helpers/dev/nameParser";
import { EventFormNavigation } from "./EventFormNavigation/EventFormNavigation";
import { CustomSpinner } from "../../../../components/CustomSpinner/CustomSpinner";
import { EventFormDraftModal } from "./EventFormDraftModal/EventFormDraftModal";
import { spielplanStore } from "../../../../store/spielplanStore/spielplanStore";

import "./EventForm.less";

export const EventForm = observer(() => {
  const language = pageStore.selectedLanguage?.toLowerCase();
  const [startTour, setStartTour] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tagsOptions, setTagsOptions] = useState(null);
  const [artistsOptions, setArtistsOptions] = useState(null);
  const [eventtypesOptions, setEventtypesOptions] = useState(null);
  const [dresscodesOptions, setDresscodesOptions] = useState(null);
  const [equipmentsOptions, setEquipmentsOptions] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    eventFormStore.resetEventForm();
  }, []);

  const [statusSteps, setStatusSteps] = useState([
    "process",
    "wait",
    "wait",
    "wait",
  ]); // value are process, finish, error and wait

  const fetchEventtypes = async () => {
    const results = await getAllEventtypes();
    spielplanStore.setEventtypes(results);
    const eventtypesOptionsResult = results.map((type) => {
      if (type.validated === false) {
        return null;
      }
      return {
        value: parseInt(type.id),
        label: nameParser(type.name, language),
        usage: type.usage,
      };
    });
    setEventtypesOptions(eventtypesOptionsResult);
  };

  const fetchLocations = async () => {
    const locations = await getLocations(true);
    spielplanStore.setLocations(locations);
  };

  const fetchTags = async () => {
    const results = await getTags();
    spielplanStore.setTags(results);
    const tagsOptionsResult = results
      .filter((tag) => tag.isEventTag)
      .map((tag) => {
        return {
          value: parseInt(tag.id),
          label: `${nameParser(tag.name, language)}${!tag.validated ? ` (${t("general.pendingReview")})` : ""}`,
        };
      });
    setTagsOptions(tagsOptionsResult);
  };

  const fetchDresscodes = async () => {
    const results = await getDresscodes();
    spielplanStore.setDresscodes(results);
    const dresscodesOptionsResult = results.map((dresscode) => {
      return {
        value: parseInt(dresscode.id),
        label: `${nameParser(dresscode.name, language)}${!dresscode.validated ? ` (${t("general.pendingReview")})` : ""}`,
        disabled: !dresscode.validated,
      };
    });
    setDresscodesOptions(dresscodesOptionsResult);
  };

  const fetchEquipments = async () => {
    const results = await getEquipments();
    spielplanStore.setEquipments(results);
    const equipementsOptionsResult = results?.map((equipement) => {
      return {
        value: parseInt(equipement.id),
        label: `${nameParser(equipement.name, language)}${!equipement.validated ? ` (${t("general.pendingReview")})` : ""}`,
        disabled: !equipement.validated,
      };
    });
    setEquipmentsOptions(equipementsOptionsResult);
  };

  const fetchArtists = async () => {
    const results = await getArtists();
    spielplanStore.setArtists(results);
    const artists = results.map((artist) => {
      return {
        value: parseInt(artist.id),
        label: `${artist.name} ${!artist.validated ? ` (${t("general.pendingReview")})` : ""}`,
        disabled: !artist.validated,
      };
    });
    setArtistsOptions(artists);
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
          eventFormStore.setEventtypeError(t("eventform.errorEventType"));
        eventFormStore.title === null &&
          eventFormStore.setTitleError(t("eventform.errorEventTitle"));
        eventFormStore.fromDate === null &&
          eventFormStore.setFromDateError(t("eventform.errorEventDate"));
        eventFormStore.toDate === null &&
          eventFormStore.setFromDateError(t("eventform.errorEventDate"));
      } else {
        tempStatusSteps[eventFormStore.formStep] = "finish";
      }
    } else if (eventFormStore.formStep === 1) {
      if (eventFormStore.artworks?.length === 0) {
        eventFormStore.setArtworksError(t("eventform.errorEventArtwork"));
        tempStatusSteps[eventFormStore.formStep] = "error";
      } else {
        tempStatusSteps[eventFormStore.formStep] = "finish";
      }
    } else if (eventFormStore.formStep === 2) {
      if (
        eventFormStore.dresscodeDoTags?.length === 0 &&
        eventFormStore.dresscodeDontTags?.length === 0 &&
        eventFormStore.hasDresscode
      ) {
        eventFormStore.setDresscodeErrors(t("eventform.errorEventDresscode"));
        tempStatusSteps[eventFormStore.formStep] = "error";
      } else {
        tempStatusSteps[eventFormStore.formStep] = "finish";
      }
    }
    // newStep (=value)
    if (value === 3) {
      if (eventFormStore.artworks?.length === 0) {
        eventFormStore.setArtworksError(t("eventform.errorEventArtwork"));
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
      if (
        eventFormStore.dresscodeDoTags?.length === 0 &&
        eventFormStore.dresscodeDontTags?.length === 0 &&
        eventFormStore.hasDresscode
      ) {
        eventFormStore.setDresscodeErrors(t("eventform.errorEventDresscode"));
        tempStatusSteps[2] = "error";
        tempStatusSteps[3] = "error";
      } else {
        tempStatusSteps[2] = "finish";
      }
    } else if (value === 2) {
      if (eventFormStore.artworks?.length === 0) {
        eventFormStore.setArtworksError(t("eventform.errorEventArtwork"));
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
      <CustomSpinner text={t("general.loading")} />
    </div>
  ) : (
    <>
      <EventFormDraftModal eventtypesOptions={eventtypesOptions} />
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
                title: t("eventform.generalInfo"),
                status: statusSteps[0],
              },
              {
                title: t("eventform.artworks"),
                status: statusSteps[1],
              },
              {
                title: t("eventform.options"),
                status: statusSteps[2],
              },
              {
                title: t("eventform.publish"),
                status: statusSteps[3],
              },
            ]}
          />
          <div className="eventform__spacer"></div>
          {eventFormStore.formStep === 0 && (
            <InfoForm eventtypesOptions={eventtypesOptions} />
          )}
          {eventFormStore.formStep === 1 && <ArtworkForm />}
          {eventFormStore.formStep === 2 && (
            <OptionForm
              fetchArtists={fetchArtists}
              fetchTags={fetchTags}
              fetchDresscodes={fetchDresscodes}
              tagsOptions={tagsOptions}
              dresscodesOptions={dresscodesOptions}
              equipmentsOptions={equipmentsOptions}
              artistsOptions={artistsOptions}
            />
          )}
          {eventFormStore.formStep === 3 && <PublishForm />}

          {authStore.hasAccess && !eventFormStore.showDraftModal && (
            <EventFormNavigation onStepsChange={onStepsChange} />
          )}
        </div>
      ) : (
        <div className="eventform__singupfirst">
          <img
            src={errorLogo}
            width="50px"
            className="eventform__singupfirstImg invertColorTheme"
          />
          <div
            className={`eventform__singupfirstText ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
            onClick={() => {
              document.location.href = "/login";
            }}
          >
            <div>{t("general.needToBeLogin")}</div>
            <div>
              {t("general.clickOn")}{" "}
              <UserOutlined className="eventform__avatarlogo" />
              {t("general.inCornerToLogin")}.
            </div>
          </div>
        </div>
      )}
    </>
  );
});
