import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Select } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { updateLinks } from "./updateLinks";

import "./EditLinksModal.less";

export const EditLinksModal = observer((props) => {
  const { t } = useTranslation();
  const { showLinksModal, setShowLinksModal } = props;
  const [userLinkValue, setUserLinkValue] = useState(profileStore.links);

  const changeHandler = (value) => {
    setUserLinkValue(value);
  };

  const saveHandler = async () => {
    try {
      await updateLinks(userLinkValue);
      profileStore.setLinks(userLinkValue);
      message.info("Links updated!");
      setShowLinksModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={<div className="modal__title">Edit user links</div>}
      open={showLinksModal}
      onCancel={() => setShowLinksModal(false)}
      footer={
        <div className="modal__footerContainer">
          <Button onClick={saveHandler} className="modal__footerButton">
            Save
          </Button>
        </div>
      }
      centered={true}
      className={`eventform__modal ${pageStore.selectedTheme === "light" ? "modal__backgroundLight" : "modal__backgroundDark"}`}
    >
      <div className="modal__select">
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder={t("eventform.pleaseSelectLinks")}
          onChange={changeHandler}
          value={userLinkValue}
        />
      </div>
    </Modal>
  );
});
