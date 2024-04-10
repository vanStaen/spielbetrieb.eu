import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { deleteEvent } from "../../../../Admin/AdminEvents/deleteEvent";
import { getAllDraftEvents } from "./getAllDraftEvents";

import "./EventFormDraftModal.less";

export const EventFormDraftModal = observer((props) => {
    const { t } = useTranslation();
    const { showDraftModal, setShowDraftModal } = props;
    const [drafts, setDrafts] = useState(null);

    const fetchDrafts = async () => {
        const drafts = await getAllDraftEvents();
        setDrafts(drafts);
        console.log('drafts', drafts);
        setShowDraftModal(!!drafts.length);
    };

    const deleteDraftHandler = async (id) => {
        await deleteEvent(id);
        fetchDrafts();
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    const draftElement = drafts?.map((draft) => {
        const { _id, title, eventtype, createdAt } = draft;
        const created = dayjs(createdAt).format("DD/MM/YY, HH:mm");
        return (
            <div className="draftmodal__element" key={_id}>
                [{eventtype}] {title}
                <span className="draftmodal__createdDate">- {created}</span>
                <Popconfirm
                    title="Sure to delete?"
                    style={{ marginRight: 8 }}
                    onConfirm={() => deleteDraftHandler(_id)}
                >
                    <DeleteOutlined className="draftmodal__elementDelete" />
                </Popconfirm>
            </div>
        );
    });

    return (
        <Modal
            title="Use a draft?"
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
