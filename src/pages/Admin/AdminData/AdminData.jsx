import React from 'react';
import { TagsOutlined, CarryOutOutlined, HeatMapOutlined } from '@ant-design/icons';

import { AdminTags } from './AdminTags/AdminTags';
import { AdminEventTypes } from './AdminEventTypes/AdminEventTypes';
import { AdminLocations } from './AdminLocations/AdminLocations';

export const AdminData = () => {

  return (
    <div>
      <div className='admin__subHeader'><TagsOutlined /> Tags admin</div>
      <AdminTags />
      <div className='admin__subHeader'><CarryOutOutlined /> EventTypes admin</div>
      <AdminEventTypes />
      <div className='admin__subHeader'><HeatMapOutlined /> Locations admin</div>
      <AdminLocations />
    </div>
  );
};
