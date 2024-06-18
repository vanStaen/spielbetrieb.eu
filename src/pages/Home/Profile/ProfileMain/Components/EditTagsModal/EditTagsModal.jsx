import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";

import "./EditTagsModal.less";

export const EditTagsModal = observer((props) => {
  const { t } = useTranslation();
  const {
    defaultValue,
    titleValue,
    showTagsModal,
    setShowTagsModal,
    updateDataBase,
    updateProfileStore,
  } = props;
  const [tagValue, setTagValue] = useState(defaultValue);

  const changeHandler = (event) => {
    setTagValue(event.target.value);
  };

  const saveHandler = async () => {
    try {
      await updateDataBase(tagValue);
      updateProfileStore(tagValue);
      message.info("Tags updated!");
      setShowTagsModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={<div className="modal__title">{titleValue}</div>}
      open={showTagsModal}
      onCancel={() => setShowTagsModal(false)}
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
      <div className="modal__select">here some tags select</div>
    </Modal>
  );
});
