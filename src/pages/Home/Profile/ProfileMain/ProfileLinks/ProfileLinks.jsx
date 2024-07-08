import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { LinkOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { userStore } from "../../../../../store/userStore/userStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditLinksModal } from "./EditLinksModal/EditLinksModal";
import { updateLinks } from "./EditLinksModal/updateLinks";

import "./ProfileLinks.less";

export const ProfileLinks = observer(() => {
  const { t } = useTranslation();
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const thisIsMe = userStore.id === profileStore.id;

  const deleteLinkHandler = async (url) => {
    try {
      const cleanedLinkArray = profileStore.links.filter((link) => {
        return JSON.parse(link).url !== url;
      });
      await updateLinks(cleanedLinkArray);
      profileStore.setLinks(cleanedLinkArray);
      message.info("Links deleted!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <EditLinksModal
        showLinksModal={showLinksModal}
        setShowLinksModal={setShowLinksModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <div className="profileLinks__container">
        <ProfileMainTitle
          title={t("profile.links")}
          value={profileStore.links?.length}
          showEdit={showLinksModal}
          setShowEdit={setShowLinksModal}
          addLink={true}
        />
        <div className="profileLinks__main">
          {profileStore.links?.length ? (
            profileStore.links.map((link, index) => {
              const linkJson = JSON.parse(link);
              return (
                <div className="profileLinks__linkContainer" key={index}>
                  <div className="profileLinks__logo">
                    <LinkOutlined />
                  </div>
                  <a
                    className="profileLinks__link"
                    href={linkJson.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {linkJson.text}
                  </a>
                  {thisIsMe && (
                    <div className="profileLinks__edit">
                      <div
                        className="profileLinks__action"
                        onClick={() => {
                          setIsEdit(index + 1);
                          setShowLinksModal(true);
                        }}
                      >
                        <EditOutlined />
                      </div>
                      <div className="profileLinks__action">
                        <Popconfirm
                          title={`Delete this link?`}
                          style={{ marginRight: 8 }}
                          onConfirm={() => deleteLinkHandler(linkJson.url)}
                        >
                          <DeleteOutlined className="event__deleteLogo" />
                        </Popconfirm>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="profileLinks__empty">{t("profile.nothingYet")}</div>
          )}
        </div>
      </div>
    </>
  );
});
