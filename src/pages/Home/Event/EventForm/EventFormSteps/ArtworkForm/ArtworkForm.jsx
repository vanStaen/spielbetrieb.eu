import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  PictureOutlined,
  LoadingOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import { eventFormStore } from "../../eventFormStore";

import "./ArtworkForm.less";

export const ArtworkForm = observer(() => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragDroping, setIsDragDroping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([0, 0]);

  const fileUploadHandler = (file) => {
    setIsUploading(true);
    console.log("fileUploadHandler");
    console.log("file", file);
    // add s3 link to eventFormStore.artworks
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

  return (
    <>
      <form className="artwork__form">
        <input
          type="file"
          className="inputfile"
          name="inputfile"
          id="file"
          onChange={fileUploadHandler}
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
                  Click, or drag here a image file <br />
                  <i>jpg and png files only</i>
                </div>
              </>
            ) : (
              <>
                <div className="uploadIcon">
                  <FileAddOutlined />
                </div>
                <div>
                  Drop your iamges here <br />
                  <i>Multiple files supported</i>
                </div>
              </>
            )}
          </label>
        )}
      </form>
    </>
  );
});
