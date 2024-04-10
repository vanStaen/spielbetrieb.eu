import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { deleteEvent } from "../../../../Admin/AdminEvents/deleteEvent";
import { getAllDraftEvents } from "./getAllDraftEvents";
import { eventFormStore } from "../eventFormStore";

import "./EventFormDraftModal.less";

export const EventFormDraftModal = observer((props) => {
  const { t } = useTranslation();
  const { showDraftModal, setShowDraftModal, eventtypes } = props;
  const [drafts, setDrafts] = useState(null);

  const fetchDrafts = async () => {
    const drafts = await getAllDraftEvents();
    setDrafts(drafts);
    setShowDraftModal(!!drafts.length);
  };

  const deleteDraftHandler = async (id) => {
    // TODO (STYLING)
    await deleteEvent(id);
    fetchDrafts();
  };

  const selectDraftHandler = (draft) => {
    // TODO
    eventFormStore.setTitle(draft.title);
    eventFormStore.setEventtype(draft.eventtype);
    setShowDraftModal(false);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const draftElement = drafts?.map((draft) => {
    const { _id, title, eventtype, createdAt } = draft;
    const created = dayjs(createdAt).format("DD/MM/YY HH:mm");
    const eventtypeString = eventtypes.filter((e) => e.value === eventtype)[0]
      .label;
    return (
      <div
        onClick={() => selectDraftHandler(draft)}
        className="draftmodal__element"
        key={_id}
      >
        <div className="draftmodal__eventTitle">{title}</div>
        <div className="draftmodal__info">
          {eventtypeString}, {created}
          <DeleteOutlined
            className="draftmodal__elementDelete"
            onClick={(event) => {
              event.stopPropagation();
              deleteDraftHandler(_id);
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <Modal
      title={<div className="draftmodal__title">Finish one of your draft?</div>}
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
            New Event
          </Button>
        </div>
      }
      centered={true}
      className="eventform__draftModal"
    >
      <div className="draftmodal__select">{draftElement}</div>
    </Modal>
  );
});
