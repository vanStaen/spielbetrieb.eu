import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMaintitle"
import { EditTagsModal } from "./EditTagsModal/EditTagsModal";
import { nameParser } from "../../../../../helpers/dev/nameParser";

import "./ProfileTags.less";

export const ProfileTags = observer(() => {
  const { t } = useTranslation();
  const [showTagsModal, setShowTagsModal] = useState(false);

  const userTags = () => {
    const userTags = profileStore.tags?.map((tagId) => {
      return {
        name: nameParser(
          pageStore.tags.find((tag) => parseInt(tag._id) === tagId)?.name,
          pageStore.selectedLanguage.toLowerCase(),
        ),
        id: tagId,
      };
    });
    const tagsFormatted = userTags?.map((tag) => {
      return (
        <Tag key={tag.id} bordered={false}>
          #{tag.name}
        </Tag>
      );
    });
    return tagsFormatted;
  };

  return (
    <>
      <EditTagsModal
        showTagsModal={showTagsModal}
        setShowTagsModal={setShowTagsModal}
      />
      <div className="profileTags__container">
        <ProfileMainTitle
          title={t("profile.tags")}
          value={profileStore.tags?.length}
          showEdit={showTagsModal}
          setShowEdit={setShowTagsModal}
        />
        <div className="profileDescription__main">
          {profileStore.tags.length ? (
            <div>{userTags()}</div>
          ) : (
            <div className="profileDescription__empty">
              {t("profile.nothingYet")}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
