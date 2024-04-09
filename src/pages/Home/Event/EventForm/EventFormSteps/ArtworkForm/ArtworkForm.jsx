import React, { useState } from "react";
import { observer } from "mobx-react";
import { notification } from "antd";
import {
  PictureOutlined,
  LoadingOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import { eventFormStore } from "../../eventFormStore";
import { postPicture } from "../../../../../../helpers/picture/postPicture";
import { getPictureUrl } from "../../../../../../helpers/picture/getPictureUrl";

import "./ArtworkForm.less";

export const ArtworkForm = observer(() => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragDroping, setIsDragDroping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([0, 0]);

  const fileUploadHandler = async (file) => {
    setIsUploading(true);
    const result = await postPicture(file, "test");
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
      const url = await getPictureUrl(result.path, "test");
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

  const images = eventFormStore.artworksUrl.map((url) => {
    return (
      <>
        <img src={url} width="500" />
      </>
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
          <label htmlFor="file" className="uploadArea">
            <LoadingOutlined className="uploaderSpinner" />
            {uploadProgress[1] ? (
              <>
                {uploadProgress[0]} of {uploadProgress[1]}
              </>
            ) : (
              <p className="uploadText">Loading</p>
            )}
          </label>
        ) : (
          <label
            htmlFor="file"
            className="uploadArea"
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
                  Click, or drag here an image file <br />
                  <i>jpg and png files only | max 10mb</i>
                </div>
              </>
            ) : (
              <>
                <div className="uploadIcon">
                  <FileAddOutlined />
                </div>
                <div>
                  Drop your images here <br />
                  <i>Multiple files supported</i>
                </div>
              </>
            )}
          </label>
        )}
      </form>
      {images}
    </>
  );
});
