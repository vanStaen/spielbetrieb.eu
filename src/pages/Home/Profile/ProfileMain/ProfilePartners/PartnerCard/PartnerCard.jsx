import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Tag, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { userStore } from "../../../../../../store/userStore/userStore";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { CustomSpinner } from "../../../../../../components/CustomSpinner/CustomSpinner";
import { getPictureUrl } from "../../../../../../helpers/picture/getPictureUrl";
import { nameParser } from "../../../../../../helpers/dev/nameParser";

import "./PartnerCard.less";

export const PartnerCard = observer((props) => {
  const {
    id,
    name,
    avatar,
    description,
    pending,
    userName,
    suspended,
    partnerTags,
  } = props.partner;
  const isMypartner = profileStore.id === userStore?.id;
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchAvatarUrl = async () => {
    try {
      const url = await getPictureUrl(
        `${avatar}_t`,
        pending ? "temp" : "partners",
      );
      const isloaded = new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = url;
        loadImg.onload = () => resolve(url);
        loadImg.onerror = (err) => reject(err);
      });
      await isloaded;
      setAvatarUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  const createTagLists = () => {
    const tagsTemp = partnerTags?.map((tagId) => {
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
            tag.validated ? "partnerCard__tagActive" : "partnerCard__tagPending"
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
    avatar && fetchAvatarUrl();
  }, [avatar]);

  const handlepartnerContainerClick = () => {
    navigate(`/partner/${userName}`, { relative: "path" });
  };

  return (
    <div
      key={id}
      id={`partnerContainer${id}`}
      className={`partner__Container 
                ${pageStore.selectedTheme === "light" ? "partner__black" : "partner__white"}
            `}
      onClick={handlepartnerContainerClick}
    >
      {avatarUrl ? (
        <div className="partner__artwork">
          <img src={avatarUrl} />
        </div>
      ) : (
        <div className="partner__artworkLoading">
          <CustomSpinner size="small" />
        </div>
      )}
      <div className="partner__main">
        <div className={"partner__name"}>{name}</div>
        <div className={"partner__desc"}>{description}</div>
        <div className={"partner__tags"}>{createTagLists()}</div>
      </div>

      <div className="partner__actions">
        {suspended ? (
          <Tag className="red" bordered={false}>
            Suspended
          </Tag>
        ) : (
          pending && (
            <Tag className="lightRed" bordered={false}>
              Pending
            </Tag>
          )
        )}
        {isMypartner && (
          <div
            className="partner__action"
            // TODO: onClick={handleEditpartner}
          >
            <EditOutlined />
          </div>
        )}
        {(isMypartner || userStore.isAdmin) && (
          <div className="partner__action">
            <div onClick={(e) => e.stopPropagation()}>
              <Popconfirm
                title={`Archive this partner?`}
                style={{ marginRight: 8 }}
                // TODO: onConfirm={handleArchivepartner}
              >
                <DeleteOutlined className="partner__deleteLogo" />
              </Popconfirm>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
