import React from "react";
import { NotificationOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Tooltip } from "antd";

import "./NewsletterForm.less";

export const NewsletterForm = observer(() => {
  return (
    <Tooltip title="Newsletter" placement="bottom">
      <NotificationOutlined />
    </Tooltip>
  );
});
