import React from "react";
import { Tabs } from "antd";
import {
  TagsOutlined,
  CarryOutOutlined,
  HeatMapOutlined,
  WomanOutlined,
  ApiOutlined,
  ShopOutlined,
  SkinOutlined,
  ThunderboltOutlined,
  SplitCellsOutlined,
} from "@ant-design/icons";

import { AdminTags } from "./AdminTags/AdminTags";
import { AdminArtists } from "./AdminArtists/AdminArtists";
import { AdminDresscodes } from "./AdminDresscodes/AdminDresscodes";
import { AdminEquipments } from "./AdminEquipments/AdminEquipments";
import { AdminEventtypes } from "./AdminEventtypes/AdminEventtypes";
import { AdminLocations } from "./AdminLocations/AdminLocations";
import { AdminPartnertypes } from "./AdminPartnertypes/AdminPartnertypes";

export const AdminData = () => {
  const items = [
    {
      key: "1",
      label: (
        <>
          <TagsOutlined /> Tags
        </>
      ),
      children: <AdminTags />,
    },
    {
      key: "2",
      label: (
        <>
          <CarryOutOutlined /> Event types
        </>
      ),
      children: <AdminEventtypes />,
    },
    {
      key: "3",
      label: (
        <>
          <ShopOutlined /> Partner types
        </>
      ),
      children: <AdminPartnertypes />,
    },
    {
      key: "4",
      label: (
        <>
          <HeatMapOutlined /> Locations
        </>
      ),
      children: <AdminLocations />,
    },
    {
      key: "5",
      label: (
        <>
          <ThunderboltOutlined /> Artists
        </>
      ),
      children: <AdminArtists />,
    },
    {
      key: "6",
      label: (
        <>
          <SkinOutlined /> Dresscodes
        </>
      ),
      children: <AdminDresscodes />,
    },
    {
      key: "7",
      label: (
        <>
          <SplitCellsOutlined /> Equipments
        </>
      ),
      children: <AdminEquipments />,
    },
    {
      key: "8",
      label: (
        <>
          <WomanOutlined /> Genders
        </>
      ),
      children: "",
      disabled: true,
    },
    {
      key: "9",
      label: (
        <>
          <ApiOutlined /> Orientations
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
