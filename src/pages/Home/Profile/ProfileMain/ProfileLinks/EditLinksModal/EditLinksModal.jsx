import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Modal, Button, message, Input, Form } from "antd";
import { LinkOutlined, FontSizeOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { updateLinks } from "./updateLinks";

import "./EditLinksModal.less";

export const EditLinksModal = observer((props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showLinksModal, setShowLinksModal, isEdit, setIsEdit } = props;
  const [userLinkValue, setUserLinkValue] = useState(profileStore.links);

  useEffect(() => {
    form.resetFields();
    if (isEdit) {
      form.setFieldValue("linkUrl", JSON.parse(userLinkValue[isEdit - 1]).url);
      form.setFieldValue(
        "linkText",
        JSON.parse(userLinkValue[isEdit - 1]).text,
      );
    } else {
      form.setFieldValue("linkUrl", null);
      form.setFieldValue("linkText", null);
    }
  }, [showLinksModal]);

  const submitHandler = async (values) => {
    const url = values.linkUrl;
    const text = values.linkText;
    try {
      const newUserLinkValue = userLinkValue.slice();
      if (isEdit) {
        newUserLinkValue.splice(isEdit - 1, 1);
        newUserLinkValue.push(JSON.stringify({ url, text }));
      } else {
        newUserLinkValue.push(JSON.stringify({ url, text }));
      }
      await updateLinks(newUserLinkValue);
      setUserLinkValue(newUserLinkValue);
      profileStore.setLinks(newUserLinkValue);
      message.info("Links updated!");
      setShowLinksModal(false);
      setIsEdit(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={<div className="modal__title">Edit user links</div>}
      open={showLinksModal}
      onCancel={() => setShowLinksModal(false)}
      footer={null}
      centered={true}
      className={`eventform__modal ${pageStore.selectedTheme === "light" ? "modal__backgroundLight" : "modal__backgroundDark"}`}
    >
      <div className="modal__select">
        <Form
          form={form}
          name="createPartnerForm"
          onFinish={submitHandler}
          style={{ height: "100%" }}
        >
          <Form.Item
            name="linkUrl"
            rules={[
              {
                required: true,
                message: t("profile.missingLinkUrl"),
              },
              {
                type: "url",
                message: t("profile.thisShouldBeValidUrl"),
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              prefix={<LinkOutlined />}
              placeholder={t("eventform.addLinkUrl")}
            />
          </Form.Item>
          <Form.Item
            name="linkText"
            rules={[
              {
                required: true,
                message: t("profile.missingLinkText"),
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              prefix={<FontSizeOutlined />}
              placeholder={t("eventform.addLinkText")}
            />
          </Form.Item>
          <div className="modal__footerContainer">
            <Form.Item>
              <Button htmlType="submit" className="modal__footerButton">
                {isEdit ? "Edit link" : "Add link"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
});
