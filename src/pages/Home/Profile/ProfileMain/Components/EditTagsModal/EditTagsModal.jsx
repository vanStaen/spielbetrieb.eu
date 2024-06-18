import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Select } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { nameParser } from "../../../../../../helpers/dev/nameParser";

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

  const tagsOptions = pageStore.tags
    .filter((tag) => tag.isUserTag)
    .map((tag) => {
      return {
        value: parseInt(tag._id),
        label: `${nameParser(tag.name, pageStore.selectedLanguage)}${!tag.validated ? ` (${t("general.pendingReview")})` : ""}`,
        disabled: !tag.validated,
      };
    });

  console.log("tagsOptions", tagsOptions);

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
      <div className="modal__select">
        <Select
          mode="tags"
          allowClear
          style={{ width: "100%" }}
          placeholder={t("eventform.pleaseSelectTags")}
          options={tagsOptions}
          onChange={changeHandler}
          value={defaultValue}
          filterOption={(inputValue, option) =>
            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    </Modal>
  );
});
