import React from 'react';
import { Tabs } from 'antd';
import { 
  TagsOutlined, 
  CarryOutOutlined, 
  HeatMapOutlined,
  WomanOutlined,
  ApiOutlined,
  ShopOutlined,
} from '@ant-design/icons';

import { AdminTags } from './AdminTags/AdminTags';
import { AdminEventtypes } from './AdminEventtypes/AdminEventtypes';
import { AdminLocations } from './AdminLocations/AdminLocations';
import { AdminPartnertypes } from './AdminPartnertypes/AdminPartnertypes';

export const AdminData = () => {

  const items = [
    {
      key: '1',
      label: <><TagsOutlined /> Tags</>,
      children: <AdminTags />,
    },
    {
      key: '2',
      label: <><CarryOutOutlined /> Event types</>,
      children: <AdminEventtypes />,
    },
    {
      key: '3',
      label: <><ShopOutlined /> Partner types</>,
      children: <AdminPartnertypes />,
    },
    {
      key: '4',
      label: <><HeatMapOutlined /> Locations</>,
      children: <AdminLocations />,
    },
    {
      key: '5',
      label: <><WomanOutlined /> Genders</>,
      children: '',
      disabled: true,
    },
    {
      key: '6',
      label: <><ApiOutlined /> Orientations</>,
      children: '',
      disabled: true,
    },
  ];

  return (
    <div>
      <Tabs 
        defaultActiveKey="1" 
        items={items} 
        className='admin__tabs'
      />
    </div>
  );
};