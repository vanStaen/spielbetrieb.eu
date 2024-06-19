import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Select } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { nameParser } from "../../../../../../helpers/dev/nameParser";
import { updateTags } from "./updateTags";

import "./EditTagsModal.less";

export const EditTagsModal = observer((props) => {
  const { t } = useTranslation();
  const { showTagsModal, setShowTagsModal } = props;
  const [userTagValue, setUserTagValue] = useState(profileStore.tags);

  const changeHandler = (value) => {
    console.log(value);
    setUserTagValue(value);
  };

  const userTagsOptions = pageStore.tags
    .filter((tag) => tag.isUserTag)
    .map((tag) => {
      return {
        value: parseInt(tag._id),
        label: `${nameParser(tag.name, pageStore.selectedLanguage)}${!tag.validated ? ` (${t("general.pendingReview")})` : ""}`,
        disabled: !tag.validated,
      };
    });

  const saveHandler = async () => {
    try {
      await updateTags(userTagValue);
      profileStore.setTags(userTagValue);
      message.info("Usertags updated!");
      setShowTagsModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={<div className="modal__title">Edit user tags</div>}
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
          options={userTagsOptions}
          onChange={changeHandler}
          value={userTagValue}
          filterOption={(inputValue, option) =>
            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    </Modal>
  );
});
