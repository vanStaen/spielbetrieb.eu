import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import "./Banner.less";

export const Banner = observer((props) => {
  const { id, desc, show } = props;

  const closeHandler = () => {
    const banner = document.getElementById(props.id);
    banner.style.maxHeight = 0;
    setTimeout(() => {
      banner.style.visibility = "hidden";
    }, 500);
  };

  useEffect(() => {
    const banner = document.getElementById(id);
    if (show) {
      banner.style.maxHeight = 0;
      banner.style.visibility = "hidden";
      setTimeout(() => {
        banner.style.visibility = "visible";
        banner.style.maxHeight = "100px";
      }, 2000);
    } else {
      banner.style.maxHeight = 0;
      setTimeout(() => {
        banner.style.visibility = "hidden";
      }, 500);
    }
  }, [id, show]);

  return (
    <>
      <div id={id} className="banner__container" onClick={closeHandler}>
        <div className="banner__desc">{desc}</div>
        <div className="banner__close" id={`${id}close`} onClick={closeHandler}>
          <CloseOutlined />
        </div>
      </div>
    </>
  );
});
