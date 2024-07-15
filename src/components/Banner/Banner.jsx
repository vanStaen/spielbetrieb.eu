import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import "./Banner.less";

export const Banner = observer((props) => {
  const { id, title, desc, color, closable } = props;
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();

  const closeHandler = () => {
    const banner = document.getElementById(props.id);
    banner.style.maxHeight = 0;
    banner.style.fontSize = 0;
    setTimeout(() => {
      banner.style.visibility = "hidden";
    }, 500);
  };

  useEffect(() => {
    const banner = document.getElementById(id);
    banner.style.maxHeight = 0;
    banner.style.visibility = "hidden";
    banner.style.fontSize = 0;
    setTimeout(() => {
      banner.style.visibility = "visible";
      banner.style.maxHeight = "100px";
      banner.style.fontSize = "14px";
    }, 1000);
  }, [id]);

  const handleMoreToggleClick = (e) => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div id={id} className={`banner__container banner__${color}`}>
        <div className="banner__title">
          <span className="uppercase">{title}</span>
          <span className="more" onClick={handleMoreToggleClick}>
            {showMore ? t("general.less") : t("general.more")}
          </span>
          {showMore && <div className="banner__desc">{desc}</div>}

        </div>
        {closable && (
          <div
            className="banner__action"
            id={`${id}close`}
            onClick={closeHandler}
          >
            <CloseOutlined />
          </div>
        )}
      </div>
    </>
  );
});
