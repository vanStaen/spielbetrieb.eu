import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Form, Modal, message, Select, Input, Button, Col, Row } from "antd";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { getPartnertypes } from "../../../../../../store/pageStore/getPartnertypes";
import { nameParser } from "../../../../../../helpers/dev/nameParser";

import "./CreatePartnerForm.less";

/* TODO:
    avatar: String

    -> after moderation
    partnerRoles: Int
    reviews: [String]
    settings: String
    pictures: [String]
    admin: [Int]
    links: [String]
    partnerTags: [Int]
*/

export const CreatePartnerForm = observer((props) => {
  const { t } = useTranslation();
  const { showModal, setShowModal } = props;
  const [partnerTypesOptions, setPartnerTypesOptions] = useState(null);
  const { TextArea } = Input;

  const fetchPartnertypes = async () => {
    const results = await getPartnertypes();
    pageStore.setPartnertypes(results);
  };

  const createPartnerTypesOptions = async () => {
    const res = await pageStore.partnertypes?.map((type) => {
      if (type.validated === false) {
        return null;
      }
      return {
        value: parseInt(type.id),
        label: nameParser(type.name, pageStore.selectedLanguage.toLowerCase()),
      };
    });
    setPartnerTypesOptions(res);
  };

  useEffect(() => {
    if (pageStore.partnertypes.length === 0) {
      fetchPartnertypes();
    }
  }, []);

  useEffect(() => {
    createPartnerTypesOptions();
  }, [pageStore.partnertypes, pageStore.selectedLanguage]);

  const submitHandler = async () => {
    try {
      message.info(t(`profile.partnerPageGoneToModeration`));
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
      footer={null}
      centered={true}
      className={`form__modal ${pageStore.selectedTheme === "light" ? "modal__backgroundLight" : "modal__backgroundDark"}`}
    >
      <div className="modal__select">
        <Form
          name="createPartnerForm"
          onFinish={submitHandler}
          style={{ height: "100%" }}
        >
          <Row>
            <Col span={6}>
              <div className="createPartnerForm__addAvatar"></div>
            </Col>
            <Col span={18}>
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
            </Col>
          </Row>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: t("profile.missingDescription"),
              },
            ]}
          >
            <TextArea
              placeholder={t("profile.shortDescription")}
              rows={3}
              maxLength={1024}
              showCount
            />
          </Form.Item>
          <div className="modal__footerContainer">
            <Form.Item>
              <Button htmlType="submit" className="modal__footerButton">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
});