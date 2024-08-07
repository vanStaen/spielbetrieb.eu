import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Input, Checkbox, notification, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";

import { pageStore } from "../../../store/pageStore/pageStore";
import { postPicture } from "../../../helpers/picture/postPicture";
import { addBug } from "../../../pages/Admin/AdminBugs/addBug";

import "./ReportBugModal.less";

const S3_BUCKET = "bugs";

export const ReportBugModal = (props) => {
  const { showReportBugModal, setShowReportBugModal } = props;
  const { t } = useTranslation();
  const { TextArea } = Input;
  const [showError, setShowError] = useState(null);
  const [desc, setDesc] = useState(null);
  const [addScreenshot, setAddScreenshot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cancelClickHandler = () => {
    setDesc(null);
    setShowError(null);
    setAddScreenshot(true);
    setShowReportBugModal(false);
  };

  const descHandler = (e) => {
    const value = e.target.value;
    if (value.length > 5) {
      setShowError(false);
    }
    setDesc(value);
  };

  const checkScreenshotHandler = (e) => {
    const value = e.target.checked;
    setAddScreenshot(value);
  };

  const ReportBugClick = async () => {
    if (!desc || desc.length <= 5) {
      setShowError(true);
    } else {
      setIsLoading(true);
      if (addScreenshot) {
        await html2canvas(document.body, {
          allowTaint: false,
          logging: false,
        }).then((canva) => {
          canva.toBlob(async (file) => {
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
              addNewBug(result.path);
            }
          });
        });
      } else {
        addNewBug();
      }
      cancelClickHandler();
    }
  };

  const addNewBug = async (screenshotPath) => {
    try {
      const dataObjectNew = {
        desc,
        screenshot: screenshotPath,
        isUrgent: false,
      };
      await addBug(dataObjectNew);
      message.success(t("help.bugReportSuccess"));
    } catch (e) {
      notification.error({
        message: "Operation failed!",
        description: e.toString(),
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title={t("help.reportBugTitle")}
      open={showReportBugModal}
      onOk={ReportBugClick}
      onCancel={cancelClickHandler}
      className={`reportbug__modal ${pageStore.selectedTheme === "light" ? "backgroundLight" : "backgroundDark"}`}
      centered={true}
      data-html2canvas-ignore={true}
      footer={null}
    >
      <TextArea
        placeholder={t("help.bugDesc")}
        value={desc}
        rows={6}
        onChange={descHandler}
      />

      <div className="reportbug__footerContainer">
        <div className="reportbug__footerContainerLeft">
          <Checkbox
            className="reportbug__screenshotCheck"
            onChange={checkScreenshotHandler}
            checked={addScreenshot}
          >
            {t("help.addScreenshot")}
          </Checkbox>
        </div>
        <Button
          onClick={ReportBugClick}
          className="reportbug__footerButton"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingOutlined style={{ marginRight: "8px" }} />{" "}
              {t("general.loading")} ...
            </>
          ) : (
            "Report this bug"
          )}
        </Button>
        {showError && (
          <div className="reportbug__error">{t("help.addDesc")}</div>
        )}
      </div>
    </Modal>
  );
};
