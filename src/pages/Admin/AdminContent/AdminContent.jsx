import React from "react";
import { Tabs } from "antd";
import {
  BulbOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import { AdminDark } from "./AdminDark/AdminDark";

export const AdminContent = () => {
  const items = [
    {
      key: "1",
      label: (
        <>
          <BulbOutlined /> Dark Issues
        </>
      ),
      children: <AdminDark />,
    },
    {
      key: "2",
      label: (
        <>
          <ReadOutlined /> Blog articles
        </>
      ),
      children: "",
      disabled: true,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} className="admin__tabs" />
    </div>
  );
};
