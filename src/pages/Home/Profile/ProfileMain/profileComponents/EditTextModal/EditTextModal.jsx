import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Input } from "antd";

import { useTranslation } from "react-i18next";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { updateText } from "./updateText";

import "./EditTextModal.less";

export const EditTextModal = observer((props) => {
  const { t } = useTranslation();
  const { field, profileStoreSet, showModal, setShowModal } = props;
  const [textValue, setTextValue] = useState(profileStore[field]);
  const { TextArea } = Input;

  const changeHandler = (event) => {
    setTextValue(event.target.value);
  };

  const saveHandler = async () => {
    try {
      await updateText(field, textValue);
      profileStoreSet(textValue);
      message.info(t(`profile.${field}Updated`));
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={<div className="modal__title">{t(`profile.${field}Edit`)}</div>}
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={
        <div className="modal__footerContainer">
          <Button onClick={saveHandler} className="modal__footerButton">
            Save
          </Button>
        </div>
      }
      centered={true}
      className={`form__modal ${pageStore.selectedTheme === "light" ? "modal__backgroundLight" : "modal__backgroundDark"}`}
    >
      <div className="modal__select">
        <TextArea
          defaultValue={textValue}
          rows={8}
          maxLength={1024}
          onChange={changeHandler}
          showCount
        />
      </div>
    </Modal>
  );
});
