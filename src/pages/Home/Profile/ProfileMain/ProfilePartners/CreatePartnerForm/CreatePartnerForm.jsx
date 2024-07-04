import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Form, Modal, Button, message, Select, Input } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { userStore } from "../../../../../../store/userStore/userStore";
import { getPartnertypes } from "../../../../../../store/pageStore/getPartnertypes";
import { nameParser } from "../../../../../../helpers/dev/nameParser";

import "./CreatePartnerForm.less";

/* TODO:
    name: String!
    description: String
    avatar: String
    partnertype: Int

    -> after moderation
    partnerRoles: Int
    reviews: [String]
    profilSettings: String
    pictures: [String]
    admin: [Int]
*/

export const CreatePartnerForm = observer((props) => {
  const { t } = useTranslation();
  const { showModal, setShowModal } = props;
  const [partnertypes, setPartnertypes] = useState(null);

  const fetchPartnertypes = async () => {
    const results = await getPartnertypes();
    setPartnertypes(results);
  };

  const partnerTypesOptions = partnertypes?.map((type) => {
    if (type.validated === false) {
      return null;
    }
    return {
      value: parseInt(type.id),
      label: nameParser(type.name, userStore.language.toLowerCase()),
    };
  });

  useEffect(() => {
    // if (pageStore.partnertypes.length === 0) {
    fetchPartnertypes();
    // }
  }, []);

  const saveHandler = async () => {
    try {
      message.info(t(`profile.partnerPageDoneToModeration`));
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={
        <div className="modal__title">{t(`profile.createPartnerPage`)}</div>
      }
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
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: t("profile.missingPartnerName"),
            },
          ]}
        >
          <Input placeholder={t("profile.partnerName")} />
        </Form.Item>
        <Form.Item
          name="partner type"
          rules={[
            {
              required: true,
              message: t("profile.missingPartnerType"),
            },
          ]}
        >
          <Select
            placeholder={t("profile.partnerType")}
            options={partnerTypesOptions}
          />
        </Form.Item>
      </div>
    </Modal>
  );
});
