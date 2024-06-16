import React from "react";
import { observer } from "mobx-react";
import { EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./ProfileMainTitle.less";

export const ProfileMainTitle = observer((props) => {
  const { value, title } = props;
  const hasValue = value !== undefined && value > 0;

  return (
    <div className="profileMain__title">
      {title} {hasValue && `( ${value})`}
      <div className="profileMain__edit">
        <Tooltip title="edit">
          <EditOutlined />
        </Tooltip>
      </div>
    </div>
  );
});
