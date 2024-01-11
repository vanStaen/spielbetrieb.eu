import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { notification, Button } from "antd";

import { pageStore } from "../../store/pageStore";

import "./AcceptCookies.less";

export const AcceptCookies = () => {
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

  const openAcceptCookie = () => {
    const key = `cookieform${Date.now()}`;
    notification.destroy();
    notification.open({
      message: <AcceptCookieTitle />,
      description: <AcceptCookieDesc key={key} />,
      duration: 0,
      placement: "bottomRight",
      className: "customNotification",
      key: key,
    });
  };

  useEffect(() => {
    if (hasRenderedOnce === false) {
      if (!pageStore.allowCookie || process.env.NODE_ENV === "development") {
        openAcceptCookie();
      }
    }
    setHasRenderedOnce(true);
  });

  return;
};

const AcceptCookieTitle = () => {
  const { t } = useTranslation();
  return <>🍪 {t("legal.cookiesTitle")}</>;
};

const AcceptCookieDesc = (props) => {
  const { t } = useTranslation();

  const handleAcceptCookie = () => {
    pageStore.setAllowCookie(true);
    notification.destroy(props.key);
  };

  return (
    <>
      {t("legal.cookiesDesc")}
      <Button className="cookie__button" onClick={() => handleAcceptCookie()}>
        {t("legal.accept")}
      </Button>
    </>
  );
};
