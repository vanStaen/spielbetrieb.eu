import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditTagsModal } from "./EditTagsModal/EditTagsModal";
import { nameParser } from "../../../../../helpers/dev/nameParser";
import { partnerStore } from "../../../../../store/partnerStore/partnerStore";

import "./ProfileTags.less";

export const ProfileTags = observer((props) => {
  const { t } = useTranslation();
  const { thisIsMine, isPartner } = props;
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [tagValue, setTagValue] = useState(
    isPartner ? partnerStore.tags : profileStore.tags,
  );

  // TODO: Add this tag logic to event form
  const createTagLists = (tagsCode) => {
    const tagsTemp = tagsCode?.map((tagId) => {
      const tagData = pageStore.tags.find((tag) => parseInt(tag.id) === tagId);
      const tagName = nameParser(
        tagData?.name,
        pageStore.selectedLanguage.toLowerCase(),
      );
      if (!tagName) {
        return null;
      }
      return {
        name: `${tagName}${!tagData?.validated ? ` (${t("general.pendingReview")})` : ""}`,
        id: tagId,
        validated: tagData?.validated,
      };
    });
    const tagsFormatted = tagsTemp?.map((tag) => {
      if (!tag) {
        return null;
      }
      return (
        <Tag
          key={tag.id}
          bordered={false}
          className={
            tag.validated ? "profileTags__tagActive" : "profileTags__tagPending"
          }
          style={{ opacity: tag.name ? 1 : 0.25 }}
        >
          #{tag.name ? tag.name : <i> {t("general.loading")}</i>}
        </Tag>
      );
    });
    return tagsFormatted;
  };

  useEffect(() => {
    setTagValue(isPartner ? partnerStore.tags : profileStore.tags);
  }, [profileStore.tags, partnerStore.tags]);

  return (
    <>
      <EditTagsModal
        showTagsModal={showTagsModal}
        setShowTagsModal={setShowTagsModal}
        isPartner={isPartner}
      />
      <div className="profileTags__container">
        <ProfileMainTitle
          title={t("profile.tags")}
          value={tagValue?.length}
          showEdit={showTagsModal}
          setShowEdit={setShowTagsModal}
          thisIsMine={thisIsMine}
        />
        <div className="profileTags__main">
          {tagValue.length ? (
            <div>{createTagLists(tagValue)}</div>
          ) : (
            <div className="profileTags__empty">{t("profile.nothingYet")}</div>
          )}
        </div>
      </div>
    </>
  );
});
