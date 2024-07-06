import React, { useState } from "react";
import { observer } from "mobx-react";
import { Popconfirm, notification, message } from "antd";
import { DeleteOutlined, BackwardOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { postPicture } from "../../../../../../helpers/picture/postPicture";
import { deletePicture } from "../../../../../../helpers/picture/deletePicture";
import { getPictureUrl } from "../../../../../../helpers/picture/getPictureUrl";
import { arrayMove } from "../../../../../../helpers/manipulation/arrayMove";
import { UploadForm } from "../../../../../../components/UploadForm/UploadForm";

import "./ArtworkForm.less";

const S3_BUCKET = "events";

// TODO: create separate upload form component

export const ArtworkForm = observer(() => {
  const [isUploading, setIsUploading] = useState(false);
  const hasArtworks = eventFormStore.artworks.length > 0;
  const { t } = useTranslation();

  const fileUploadHandler = async (file) => {
    setIsUploading(true);
    const result = await postPicture(file, S3_BUCKET);
    if (result.error) {
      notification.error({
        message: "Upload failed!",
        description: result.error.toString(),
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    } else if (result.path) {
      const tempArtworkArray = eventFormStore.artworks;
      const tempArtworkUrlArray = eventFormStore.artworksUrl;
      const url = await getPictureUrl(result.path, S3_BUCKET);
      tempArtworkArray.push(result.path);
      tempArtworkUrlArray.push(url);
      eventFormStore.setArtworks(tempArtworkArray);
      eventFormStore.setArtworksUrl(tempArtworkUrlArray);
      eventFormStore.setArtworksError(null);
    }
    setIsUploading(false);
  };

  const deletePictureHandler = async (index) => {
    try {
      const path = eventFormStore.artworks[index];
      await deletePicture(path, S3_BUCKET);
      const tempArtworksObject = eventFormStore.artworks;
      const tempArtworksUrlObject = eventFormStore.artworksUrl;
      tempArtworksObject.splice(index, 1);
      tempArtworksUrlObject.splice(index, 1);
      eventFormStore.setArtworks(tempArtworksObject);
      eventFormStore.setArtworksUrl(tempArtworksUrlObject);
      message.success("Artwork deleted!");
    } catch (e) {
      notification.error({
        message: "Error!",
        description: e.toString(),
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
  };

  const movePictureHandler = async (index) => {
    if (index === 0) {
      return;
    }
    const tempArtworksObject = eventFormStore.artworks;
    const tempArtworksUrlObject = eventFormStore.artworksUrl;
    eventFormStore.setArtworks(arrayMove(tempArtworksObject, index, index - 1));
    eventFormStore.setArtworksUrl(
      arrayMove(tempArtworksUrlObject, index, index - 1),
    );
  };

  const images = eventFormStore.artworksUrl.map((url, index) => {
    return (
      <div className="artwork__imgContainer" key={`imgKey${index}`}>
        <div className="artwork__imgOverlay">
          {index > 0 && (
            <div
              className="artwork__imgActionButton half move"
              onClick={() => movePictureHandler(index)}
            >
              <BackwardOutlined className="rotated" />
            </div>
          )}
          <Popconfirm
            title={t("eventform.validateDelete")}
            onConfirm={() => deletePictureHandler(index)}
            icon={null}
          >
            <div
              className={`artwork__imgActionButton delete ${index > 0 ? "half" : "full"}`}
            >
              <DeleteOutlined />
            </div>
          </Popconfirm>
        </div>
        <img src={url} className="artwork__img" />
      </div>
    );
  });

  return (
    <>
      <div className="artworkform__error">{eventFormStore.artworksError}</div>
      <UploadForm
        fileUploadHandler={fileUploadHandler}
        isUploading={isUploading}
        showText={true}
        width="100vw"
        height={
          hasArtworks
            ? "calc(var(--vh, 1vh) * 60 - 300px) !important"
            : "calc(var(--vh, 1vh) * 100 - 330px) !important"
        }
      />
      <div className="artwork__container">{images}</div>
    </>
  );
});
