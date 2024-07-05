import React, { useState } from "react";
import { observer } from "mobx-react";
import { Popconfirm, notification, message } from "antd";
import { useTranslation } from "react-i18next";
import {
  PictureOutlined,
  LoadingOutlined,
  FileAddOutlined,
  DeleteOutlined,
  BackwardOutlined,
} from "@ant-design/icons";

import { eventFormStore } from "../../eventFormStore";
import { postPicture } from "../../../../../../helpers/picture/postPicture";
import { deletePicture } from "../../../../../../helpers/picture/deletePicture";
import { getPictureUrl } from "../../../../../../helpers/picture/getPictureUrl";
import { arrayMove } from "../../../../../../helpers/manipulation/arrayMove";

import "./ArtworkForm.less";

const S3_BUCKET = "events";

// TODO: create separate upload form component

export const ArtworkForm = observer(() => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragDroping, setIsDragDroping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([0, 0]);
  const { t } = useTranslation();

  const hasArtworks = eventFormStore.artworks.length > 0;

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const objectOfFiles = e.dataTransfer.files;
    const numberOfFiles = objectOfFiles.length;
    setUploadProgress([0, numberOfFiles]);
    for (let i = 0; i < numberOfFiles; i++) {
      setUploadProgress([i, numberOfFiles]);
      if (objectOfFiles[i]) {
        await fileUploadHandler(objectOfFiles[i]);
      }
    }
    setUploadProgress([0, 0]);
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
      <form className="artwork__form">
        <input
          type="file"
          className="inputfile"
          name="inputfile"
          id="file"
          onChange={(event) => {
            fileUploadHandler(event.target.files[0]);
          }}
        />
        {isUploading ? (
          <label
            htmlFor="file"
            className={hasArtworks ? "uploadArea" : "uploadAreaFull"}
          >
            <LoadingOutlined className="uploaderSpinner" />
            {uploadProgress[1] ? (
              <>
                {uploadProgress[0]} of {uploadProgress[1]}
              </>
            ) : (
              <p className="uploadText">{t("general.loading")}</p>
            )}
          </label>
        ) : (
          <label
            htmlFor="file"
            className={hasArtworks ? "uploadArea" : "uploadAreaFull"}
            onDrop={handleDrop}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            {!isDragDroping ? (
              <>
                <div className="uploadIcon">
                  <PictureOutlined />
                </div>
                <div>
                  {t("eventform.clickOrDrag")} <br />
                  <i>
                    {t("eventform.onlyPhotoFiles")} | {t("eventform.maxFiles")}{" "}
                    | {t("eventform.maxSize")}
                  </i>
                </div>
              </>
            ) : (
              <>
                <div className="uploadIcon">
                  <FileAddOutlined />
                </div>
                <div>
                  {t("eventform.dropHere")} <br />
                  <i>{t("eventform.multipleFile")}</i>
                </div>
              </>
            )}
          </label>
        )}
      </form>
      <div className="artwork__container">{images}</div>
    </>
  );
});
