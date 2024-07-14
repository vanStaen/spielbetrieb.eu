import React, { useEffect } from "react";
import { CloseOutlined, QuestionOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Tooltip } from "antd";

import "./Banner.less";

export const Banner = observer((props) => {
  const { id, title, desc, show, color, closable } = props;

  const closeHandler = () => {
    if (closable) {
      const banner = document.getElementById(props.id);
      banner.style.maxHeight = 0;
      banner.style.fontSize = 0;
      setTimeout(() => {
        banner.style.visibility = "hidden";
      }, 500);
    }
  };

  useEffect(() => {
    const banner = document.getElementById(id);
    if (show) {
      banner.style.maxHeight = 0;
      banner.style.visibility = "hidden";
      banner.style.fontSize = 0;
      setTimeout(() => {
        banner.style.visibility = "visible";
        banner.style.maxHeight = "100px";
        banner.style.fontSize = "14px";
      }, 2000);
    } else {
      banner.style.maxHeight = 0;
      banner.style.fontSize = 0;
      setTimeout(() => {
        banner.style.visibility = "hidden";
      }, 500);
    }
  }, [id, show]);

  return (
    <>
      <div
        id={id}
        className={`banner__container banner__${color}`}
        onClick={closeHandler}
      >
        <div className="banner__desc">{title}</div>
        <Tooltip title={desc} placement="bottomRight">
          <div
            className="banner__action"
            id={`${id}close`}
            onClick={closeHandler}
          >
            {closable ? <CloseOutlined /> : <QuestionOutlined />}
          </div>
        </Tooltip>
      </div>
    </>
  );
});
