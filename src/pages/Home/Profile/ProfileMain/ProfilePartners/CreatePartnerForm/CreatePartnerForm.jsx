import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Form, Modal, message, Select, Input, Button, Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { partnerStore } from "../../../../../../store/partnerStore/partnerStore";
import { getPartnertypes } from "../../../../../../store/pageStore/getPartnertypes";
import { nameParser } from "../../../../../../helpers/dev/nameParser";
import { UploadForm } from "../../../../../../components/UploadForm/UploadForm";
import { postPicture } from "../../../../../../helpers/picture/postPicture";
import { getPictureUrl } from "../../../../../../helpers/picture/getPictureUrl";

import "./CreatePartnerForm.less";
import { deletePicture } from "../../../../../../helpers/picture/deletePicture";
import { addPartner } from "./addPartner";

export const CreatePartnerForm = observer((props) => {
  const { t } = useTranslation();
  const { showModal, setShowModal } = props;
  const [partnerTypesOptions, setPartnerTypesOptions] = useState(null);
  const [isPartnerAvatarLoading, setIsPartnerAvatarLoading] = useState(false);
  const [form] = Form.useForm();
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
      const name = form.getFieldValue("name");
      const description = form.getFieldValue("description");
      const partnertype = form.getFieldValue("partnertype");
      await addPartner(name, description, partnerStore.avatar, partnertype);
      message.info(t(`profile.partnerPageGoneToModeration`));
      form.resetFields();
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const partnerAvatarUploadHandler = async (file) => {
    setIsPartnerAvatarLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await postPicture(file, "temp");
      if (res.path) {
        const url = await getPictureUrl(res.path, "temp");
        const isloaded = new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = url;
          loadImg.onload = () => resolve(url);
          loadImg.onerror = (err) => reject(err);
        });
        await isloaded;
        message.success(t("profile.avatarUploadSuccess"));
        partnerStore.setAvatar(res.path);
        partnerStore.setAvatarUrl(url);
      }
    } catch (err) {
      message.error(t("profile.avatarUpdateFail"));
      console.log(err);
    }
    setIsPartnerAvatarLoading(false);
  };

  const deleteAvatarHandler = async () => {
    setIsPartnerAvatarLoading(true);
    try {
      await deletePicture(partnerStore.avatar, "temp");
      partnerStore.setAvatar(null);
      partnerStore.setAvatarUrl(null);
    } catch (err) {
      message.error(t("profile.avatarDeleteFail"));
      console.log(err);
    }
    setIsPartnerAvatarLoading(false);
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
          form={form}
          name="createPartnerForm"
          onFinish={submitHandler}
          style={{ height: "100%" }}
        >
          <Row>
            <Col span={6}>
              {partnerStore.avatarUrl ? (
                <div
                  style={{
                    background: `url(${partnerStore.avatarUrl}) center center / cover no-repeat`,
                    width: "100px",
                    height: "90px",
                  }}
                >
                  <div
                    className="modal__deleteAvatar"
                    onClick={deleteAvatarHandler}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              ) : (
                <UploadForm
                  fileUploadHandler={partnerAvatarUploadHandler}
                  isUploading={isPartnerAvatarLoading}
                  width={"100px"}
                  height={"90px"}
                  showText={false}
                />
              )}
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
                name="partnertype"
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
