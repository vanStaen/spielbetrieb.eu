import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { deleteEvent } from "../../../../Admin/AdminEvents/deleteEvent";
import { getAllDraftEvents } from "./getAllDraftEvents";
import { eventFormStore } from "../eventFormStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { getPictureUrl } from "../../../../../helpers/picture/getPictureUrl";
import { CustomSpinner } from "../../../../../components/CustomSpinner/CustomSpinner";

import "./EventFormDraftModal.less";

export const EventFormDraftModal = observer((props) => {
  const { t } = useTranslation();
  const { eventtypesOptions } = props;
  const [drafts, setDrafts] = useState([]);
  const [draftIdToDelete, setDraftIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchDrafts = async () => {
    setIsLoading(true);
    const drafts = await getAllDraftEvents();
    setDrafts(drafts);
    eventFormStore.setShowDraftModal(!!drafts.length);
    setIsLoading(false);
  };

  const deleteDraftHandler = (id) => {
    setDraftIdToDelete(id);
    setTimeout(() => {
      setDraftIdToDelete(null);
    }, "3000");
  };

  const confirmDeleteDraftHandler = async () => {
    if (draftIdToDelete) {
      await deleteEvent(draftIdToDelete);
      message.info("Draft deleted!");
      fetchDrafts();
    }
  };

  const getUrlsFromPicturePath = async (pictures) => {
    const urls = await Promise.all(
      pictures.map((picture) => {
        return getPictureUrl(picture, "events");
      }),
    );
    return urls;
  };

  const selectDraftHandler = async (draft) => {
    setIsLoading(true);
    eventFormStore.setEventId(draft.id);
    eventFormStore.setTitle(draft.title);
    eventFormStore.setEventtype(draft.eventtype);
    eventFormStore.setDescription(draft.description);
    eventFormStore.setLocationId(draft.location);
    eventFormStore.setLocationName(draft.locationName);
    eventFormStore.setLocationAddress(draft.locationAddress);
    eventFormStore.setArtworks(draft.pictures);
    eventFormStore.setEventTags(draft.eventTags);
    eventFormStore.setLineUp(draft.lineUp);
    eventFormStore.setLinks(draft.links);
    eventFormStore.setAgeMin(draft.ageMin);
    eventFormStore.setIsPrivate(draft.private);
    eventFormStore.setForwardable(draft.forwardable);
    eventFormStore.setHasDresscode(draft.hasDresscode);
    eventFormStore.setDresscodeDoTags(draft.dresscodeDoTags);
    eventFormStore.setDresscodeDontTags(draft.dresscodeDontTags);
    eventFormStore.setEquipment(draft.equipment);
    eventFormStore.setArtworksUrl(await getUrlsFromPicturePath(draft.pictures));
    draft.fromDate && eventFormStore.setFromDate(dayjs(draft.fromDate));
    draft.untilDate && eventFormStore.setUntilDate(dayjs(draft.untilDate));
    draft.prices.length && eventFormStore.setPrices(JSON.parse(draft.prices));
    setIsLoading(false);
    eventFormStore.setShowDraftModal(false);
  };

  useEffect(() => {
    if (eventFormStore.title === null) {
      fetchDrafts();
    }
  }, []);

  const draftElement =
    drafts.length > 0 &&
    drafts?.map((draft) => {
      const { id, title, eventtype, createdAt } = draft;
      const created = dayjs(createdAt).format("DD/MM/YYYY, HH:mm");
      const eventtypeString = eventtypesOptions.filter(
        (e) => e.value === eventtype,
      )[0].label;
      return (
        <div
          onClick={() => selectDraftHandler(draft)}
          className="draftmodal__element"
          key={id}
        >
          {draftIdToDelete === id && (
            <div
              className="darftmodal__confirmDeleteTextOver"
              onClick={(event) => {
                event.stopPropagation();
                confirmDeleteDraftHandler();
              }}
            >
              Click to confirm deletion?
            </div>
          )}
          <div className="draftmodal__titleinfo">
            <div className="draftmodal__eventTitle">{title}</div>
            <div className="draftmodal__info">
              {eventtypeString}, added the {created}
            </div>
          </div>
          <DeleteOutlined
            className="draftmodal__delete"
            onClick={(event) => {
              event.stopPropagation();
              deleteDraftHandler(id);
            }}
          />
        </div>
      );
    });

  return (
    <Modal
      title={<div className="draftmodal__title">Resume work on a draft?</div>}
      open={eventFormStore.showDraftModal}
      onCancel={() => eventFormStore.setShowDraftModal(false)}
      footer={
        <div className="draftmodal__footerContainer">
          <div className="draftmodal__footerOr">
            <div className="draftmodal__footerOrLine"></div>
            <div className="draftmodal__footerOrText">{t("general.or")}</div>
            <div className="draftmodal__footerOrLine"></div>
          </div>
          <Button
            onClick={() => eventFormStore.setShowDraftModal(false)}
            className="draftmodal__footerButton"
          >
            Create a New Event
          </Button>
        </div>
      }
      centered={true}
      className={`eventform__draftModal ${pageStore.selectedTheme === "light" ? "backgroundLight" : "backgroundDark"}`}
    >
      {isLoading ? (
        <div className="draftmodal__loading">
          <CustomSpinner text={`${t("general.loading")} (Drafts)`} />
        </div>
      ) : (
        <div className="draftmodal__select">{draftElement}</div>
      )}
    </Modal>
  );
});
