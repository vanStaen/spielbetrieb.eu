import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import { getEventTypes } from './getEventTypes';
import { updateEventType } from './updateEventType';
import { deleteEventType } from './deleteEventType';
import { nameParser } from "../../../../helpers/nameParser";
import { AdminCustomSpinner } from '../../AdminCustomSpinner/AdminCustomSpinner';

export const AdminEventTypes = () => {
  const [eventTypes, setEventTypes] = useState([]);

  const fetchEventTypes = async () => {
    const results = await getEventTypes();
    setEventTypes(results);
  };

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: 'id', 
      align: 'center',
      width: '50px',
    },
    {
      title: 'Name EN',
      dataIndex: 'name',
      key: 'name_en',
      render: (_, { name }) => (nameParser(name, "en"))
    },
    {
      title: 'Name DE',
      dataIndex: 'name',
      key: 'name_de',
      render: (_, { name }) => (nameParser(name, "de"))
    },
    {
      title: 'Validated',
      dataIndex: 'validated',
      key: 'validated',      
      align: 'center',
      render: (_, { validated }) => (validated ? 'Yes' : 'No')
    },
  ];

  return (
    <div>
      {eventTypes.length === 0
        ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading Data" />
        </div>
          )
        : (
        <Table
          className="admin__table"
          dataSource={eventTypes}
          columns={columns}
          pagination={false}
          size="small"
        />
          )}
    </div>
  );
};
