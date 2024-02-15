import React from 'react';
import { Tabs } from 'antd';
import { 
  LinkOutlined, 
  ApartmentOutlined, 
} from '@ant-design/icons';

import { AdminLinks } from "./AdminLinks/AdminLinks"

export const AdminRessources = () => {

  const items = [
    {
      key: '1',
      label: <><LinkOutlined /> Links</>,
      children: <AdminLinks />,
    },
    {
      key: '2',
      label: <><ApartmentOutlined /> Network</>,
      children: '',
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
