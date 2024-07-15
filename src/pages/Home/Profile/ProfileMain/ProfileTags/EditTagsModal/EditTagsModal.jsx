import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Select } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { addTag } from "../../../../../Admin/AdminData/AdminTags/addTag";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { partnerStore } from "../../../../../../store/partnerStore/partnerStore";
import { nameParser } from "../../../../../../helpers/dev/nameParser";
import { updateTags } from "./updateTags";
import { updatePartnerTags } from "./updatePartnerTags";

import "./EditTagsModal.less";

export const EditTagsModal = observer((props) => {
  const { t } = useTranslation();
  const { showTagsModal, setShowTagsModal, isPartner } = props;
  const [tagValue, setTagValue] = useState(
    isPartner ? partnerStore.tags : profileStore.tags,
  );
  const [hasNewTag, setHasNewTag] = useState(false);

  const changeHandler = (value) => {
    value.map(async (tag, index) => {
      if (isNaN(tag)) {
        setHasNewTag(true);
        const dataObjectTag = {
          name: `{"en":"${tag}", "de":"${tag}"}`,
          isPartnerTag: isPartner,
          isUserTag: !isPartner,
        };
        const res = await addTag(dataObjectTag);
        value[index] = parseInt(res.id);
      }
    });
    setTagValue(value);
  };

  const userTagsOptions = pageStore.tags
    .filter((tag) => tag.isUserTag)
    .map((tag) => {
      return {
        value: parseInt(tag.id),
        label: `${nameParser(tag.name, pageStore.selectedLanguage)}${!tag.validated ? ` (${t("general.pendingReview")})` : ""}`,
      };
    });

  const partnerTagsOptions = pageStore.tags
    .filter((tag) => tag.isPartnerTag)
    .map((tag) => {
      return {
        value: parseInt(tag.id),
        label: `${nameParser(tag.name, pageStore.selectedLanguage)}${!tag.validated ? ` (${t("general.pendingReview")})` : ""}`,
      };
    });

  const saveHandler = async () => {
    try {
      if (isPartner) {
        await updatePartnerTags(partnerStore.id, tagValue);
        partnerStore.setTags(tagValue);
        message.info("Partner tags updated!");
      } else {
        await updateTags(tagValue);
        profileStore.setTags(tagValue);
        message.info("User tags updated!");
      }
      setShowTagsModal(false);
      if (hasNewTag) {
        pageStore.fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const closeHandler = () => {
    setShowTagsModal(false);
  };

  return (
    <Modal
      title={<div className="modal__title">Edit user tags</div>}
      open={showTagsModal}
      onCancel={closeHandler}
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
          options={isPartner ? partnerTagsOptions : userTagsOptions}
          onChange={changeHandler}
          value={tagValue}
          filterOption={(inputValue, option) =>
            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    </Modal>
  );
});
