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

import "./EventFormDraftModal.less";

export const EventFormDraftModal = observer((props) => {
  const { t } = useTranslation();
  const { showDraftModal, setShowDraftModal, eventtypes } = props;
  const [drafts, setDrafts] = useState(null);
  const [draftIdToDelete, setDraftIdToDelete] = useState(null);

  const fetchDrafts = async () => {
    const drafts = await getAllDraftEvents();
    setDrafts(drafts);
    setShowDraftModal(!!drafts.length);
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

  const selectDraftHandler = (draft) => {
    // TODO: add all info
    eventFormStore.setTitle(draft.title);
    eventFormStore.setEventtype(draft.eventtype);
    setShowDraftModal(false);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const draftElement = drafts?.map((draft) => {
    const { _id, title, eventtype, createdAt } = draft;
    const created = dayjs(createdAt).format("DD/MM/YYYY HH:mm");
    const eventtypeString = eventtypes.filter((e) => e.value === eventtype)[0]
      .label;
    return (
      <div
        onClick={() => selectDraftHandler(draft)}
        className="draftmodal__element"
        key={_id}
      >
        {draftIdToDelete === _id && (
          <div
            className="darftmodal__confirmDeleteTextOver"
            onClick={(event) => {
              event.stopPropagation();
              confirmDeleteDraftHandler();
            }}
          >
            Confirm deletion?
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
            deleteDraftHandler(_id);
          }}
        />
      </div>
    );
  });

  return (
    <Modal
      title={<div className="draftmodal__title">Resume work on a draft?</div>}
      open={showDraftModal}
      onCancel={() => setShowDraftModal(false)}
      footer={
        <div className="draftmodal__footerContainer">
          <div className="draftmodal__footerOr">
            <div className="draftmodal__footerOrLine"></div>
            <div className="draftmodal__footerOrText">{t("general.or")}</div>
            <div className="draftmodal__footerOrLine"></div>
          </div>
          <Button
            onClick={() => setShowDraftModal(false)}
            className="draftmodal__footerButton"
          >
            Create a New Event
          </Button>
        </div>
      }
      centered={true}
      className={`eventform__draftModal ${pageStore.selectedTheme === "light" ? "draftmodal__backgroundLight" : "draftmodal__backgroundDark"}`}
    >
      <div className="draftmodal__select">{draftElement}</div>
    </Modal>
  );
});
