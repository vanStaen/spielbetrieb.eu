import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import "./Banner.less";

export const Banner = observer((props) => {
  const { id, title, desc, show, color, closable } = props;
  const [showMore, setShowMore] = useState(false);

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

  const handleMoreToggleClick = (e) => {
    setShowMore(!showMore);
  }

  return (
    <>
      <div
        id={id}
        className={`banner__container banner__${color}`}
        onClick={closeHandler}
      >
        <div className="banner__title">
          <span className="uppercase">{title}</span>
          <span className="more" onClick={handleMoreToggleClick}>
            {showMore ? 'less' : 'more'}
          </span>
        </div>
        {showMore && <div className="banner__desc">{desc}</div>}
        {closable && <div
          className="banner__action"
          id={`${id}close`}
          onClick={closeHandler}
        >
          <CloseOutlined />
        </div>}
      </div>
    </>
  );
});
