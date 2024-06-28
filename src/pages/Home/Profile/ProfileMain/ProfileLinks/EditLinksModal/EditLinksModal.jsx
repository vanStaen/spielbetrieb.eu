import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Select } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { nameParser } from "../../../../../../helpers/dev/nameParser";
import { updateLinks } from "./updateLinks";

import "./EditLinksModal.less";

export const EditLinksModal = observer((props) => {
  const { t } = useTranslation();
  const { showLinksModal, setShowLinksModal } = props;
  const [userLinkValue, setUserLinkValue] = useState(profileStore.links);

  const changeHandler = (value) => {
    console.log(value);
    setUserLinkValue(value);
  };

  const userLinksOptions = pageStore.links
    .filter((link) => link.isUserLink)
    .map((link) => {
      return {
        value: parseInt(link.id),
        label: `${nameParser(link.name, pageStore.selectedLanguage)}${!link.validated ? ` (${t("general.pendingReview")})` : ""}`,
        disabled: !link.validated,
      };
    });

  const saveHandler = async () => {
    try {
      await updateLinks(userLinkValue);
      profileStore.setLinks(userLinkValue);
      message.info("Userlinks updated!");
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
          mode="links"
          allowClear
          style={{ width: "100%" }}
          placeholder={t("eventform.pleaseSelectLinks")}
          options={userLinksOptions}
          onChange={changeHandler}
          value={userLinkValue}
          filterOption={(inputValue, option) =>
            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    </Modal>
  );
});
