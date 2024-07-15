import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Popconfirm, message } from "antd";

import { partnerStore } from "../../../../../store/partnerStore/partnerStore";
import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditLinksModal } from "./EditLinksModal/EditLinksModal";
import { updateLinks } from "./EditLinksModal/updateLinks";
import { updatePartnerLinks } from "./EditLinksModal/updatePartnerLinks";
import { getIcon } from "./getIcon";

import "./ProfileLinks.less";

export const ProfileLinks = observer((props) => {
  const { t } = useTranslation();
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const { thisIsMine, isPartner } = props;
  const links = isPartner ? partnerStore.links : profileStore.links;

  const deleteLinkHandler = async (url) => {
    try {
      if (isPartner) {
        const cleanedLinkArray = partnerStore.links.filter((link) => {
          return JSON.parse(link).url !== url;
        });
        await updatePartnerLinks(partnerStore.id, cleanedLinkArray);
        partnerStore.setLinks(cleanedLinkArray);
      } else {
        const cleanedLinkArray = profileStore.links.filter((link) => {
          return JSON.parse(link).url !== url;
        });
        await updateLinks(cleanedLinkArray);
        profileStore.setLinks(cleanedLinkArray);
      }
      message.info("Link deleted!");
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
        isPartner={isPartner}
      />
      <div className="profileLinks__container">
        <ProfileMainTitle
          title={t("profile.links")}
          value={links}
          showEdit={showLinksModal}
          setShowEdit={setShowLinksModal}
          addLink={true}
          thisIsMine={thisIsMine}
        />
        <div className="profileLinks__main">
          {links?.length ? (
            links.map((link, index) => {
              const linkJson = JSON.parse(link);
              return (
                <div className="profileLinks__linkContainer" key={index}>
                  <div className="profileLinks__logo">
                    {getIcon(linkJson.url)}
                  </div>
                  <a
                    className="profileLinks__link"
                    href={linkJson.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {linkJson.text}
                  </a>
                  {thisIsMine && (
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
