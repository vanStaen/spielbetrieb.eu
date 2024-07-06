import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PictureOutlined,
  LoadingOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import "./UploadForm.less";

export const UploadForm = (props) => {
  const { fileUploadHandler, isUploading, width, height, showText } = props;
  const [isDragDroping, setIsDragDroping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([0, 0]);
  const { t } = useTranslation();

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

  return (
    <form className="upload__form">
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
        <label htmlFor="file" style={{ height, width }}>
          <LoadingOutlined className="uploaderSpinner" />
          {uploadProgress[1] ? (
            <>
              {uploadProgress[0]} of {uploadProgress[1]}
            </>
          ) : (
            showText && <p className="uploadText">{t("general.loading")}</p>
          )}
        </label>
      ) : (
        <label
          htmlFor="file"
          style={{ height, width }}
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
              {showText && (
                <div>
                  {t("eventform.clickOrDrag")} <br />
                  <i>
                    {t("eventform.onlyPhotoFiles")} | {t("eventform.maxFiles")}{" "}
                    | {t("eventform.maxSize")}
                  </i>
                </div>
              )}
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
  );
};
