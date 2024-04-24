import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Input, Checkbox } from "antd";
import html2canvas from "html2canvas";

import { pageStore } from "../../../store/pageStore/pageStore";

import "./ReportBugModal.less";

export const ReportBugModal = (props) => {
    const { showReportBugModal, setShowReportBugModal } = props;
    const { t } = useTranslation();
    const { TextArea } = Input;
    const [showError, setShowError] = useState(null);
    const [desc, setDesc] = useState(null);
    const [addScreenshot, setAddScreenshot] = useState(true);

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

    const ReportBugClick = () => {
        if (!desc || desc.length <= 5) {
            setShowError(true);
        } else {
            html2canvas(document.body, { allowTaint: true, logging: false }).then(
                (canva) => {
                    // const canvaByteArray = canva.toDataURL();
                    canva.toBlob((result) => console.log(result));
                },
            );
        }
    };

    return (
        <Modal
            title="Report bug"
            open={showReportBugModal}
            onOk={ReportBugClick}
            onCancel={() => setShowReportBugModal(false)}
            className={`reportbug__modal ${pageStore.selectedTheme === "light" ? "reportbug__backgroundLight" : "reportbug__backgroundDark"}`}
            centered={true}
            data-html2canvas-ignore={true}
            footer={
                <div className="reportbug__footerContainer">
                    <Button
                        onClick={ReportBugClick}
                        className="reportbug__footerButton"
                    >
                        Report this bug
                    </Button>
                </div>
            }
        >
            <TextArea
                placeholder={"Please describe this bug"}
                value={desc}
                rows={6}
                onChange={descHandler}
            />
            <Checkbox
                className="reportbug__screenshotCheck"
                onChange={checkScreenshotHandler}
                checked={addScreenshot}
            >
                Automatically add a screenshot
            </Checkbox>
            {showError &&
                <div className="reportbug__error">
                    You need to add a description
                </div>}

        </Modal >
    );
};
