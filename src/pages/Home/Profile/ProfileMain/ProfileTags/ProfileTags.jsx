import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditTagsModal } from "./EditTagsModal/EditTagsModal";
import { nameParser } from "../../../../../helpers/dev/nameParser";

import "./ProfileTags.less";

export const ProfileTags = observer(() => {
  const { t } = useTranslation();
  const [showTagsModal, setShowTagsModal] = useState(false);

  const createUserTags = () => {
    const userTags = profileStore.tags?.map((tagId) => {
      return {
        name: nameParser(
          pageStore.tags.find((tag) => parseInt(tag.id) === tagId)?.name,
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

  const [userTags, setUserTags] = useState(createUserTags());

  useEffect(() => {
    setUserTags(createUserTags());
  }, [profileStore.tags]);

  // TODO: Pending tags

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
        <div className="profileTags__main">
          {profileStore.tags.length ? (
            <div>{userTags}</div>
          ) : (
            <div className="profileTags__empty">{t("profile.nothingYet")}</div>
          )}
        </div>
      </div>
    </>
  );
});
