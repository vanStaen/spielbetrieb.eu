import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Input } from "antd";

import { useTranslation } from "react-i18next";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { partnerStore } from "../../../../../../store/partnerStore/partnerStore";
import { updateText } from "./updateText";
import { updatePartnerText } from "./updatePartnerText";

import "./EditTextModal.less";

export const EditTextModal = observer((props) => {
  const { t } = useTranslation();
  const { field, storeSetter, showModal, setShowModal, isPartner } = props;
  const [textValue, setTextValue] = useState(isPartner ? partnerStore[field] : profileStore[field]);
  const { TextArea } = Input;

  const changeHandler = (event) => {
    setTextValue(event.target.value);
  };

  const saveHandler = async () => {
    try {
      if (isPartner) {
        await updatePartnerText(partnerStore.id, field, textValue);
      } else {
        await updateText(field, textValue);
      }
      storeSetter(textValue);
      message.info(t(`profile.${field} updated`));
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
        />
      </div>
    </Modal>
  );
});
