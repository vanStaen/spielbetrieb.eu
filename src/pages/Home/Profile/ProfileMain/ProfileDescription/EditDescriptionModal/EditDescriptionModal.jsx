import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Input } from "antd";

import { useTranslation } from "react-i18next";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";

import "./EditDescriptionModal.less";
import { updateDescription } from "./updateDescription";

export const EditDescriptionModal = observer((props) => {
  const { t } = useTranslation();
  const { showDescriptionModal, setShowDescriptionModal } = props;
  const { TextArea } = Input;
  const [descValue, setDescValue] = useState(profileStore.description);

  const changeHandler = (event) => {
    setDescValue(event.target.value);
  };

  const saveHandler = async () => {
    try {
      await updateDescription(descValue);
      profileStore.setDescription(descValue);
      message.info("Description updated!");
      setShowDescriptionModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={<div className="modal__title">Edit description</div>}
      open={showDescriptionModal}
      onCancel={() => setShowDescriptionModal(false)}
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
        <TextArea
          defaultValue={descValue}
          rows={8}
          maxLength={1024}
          onChange={changeHandler}
        />
      </div>
    </Modal>
  );
});
