import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import { getTags } from './getTags';
import { nameParser } from "../../../../helpers/nameParser";
import { AdminCustomSpinner } from '../../AdminCustomSpinner/AdminCustomSpinner';

export const AdminTags = () => {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const results = await getTags();
    setTags(results);
  };

  useEffect(() => {
    fetchTags();
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
      title: 'User tag',
      dataIndex: 'isUserTag',
      key: 'isUserTag',      
      align: 'center',
      render: (_, { isUserTag }) => (isUserTag ? 'Yes' : 'No')
    },
    {
      title: 'Event tag',
      dataIndex: 'isEventTag',
      key: 'isEventTag',      
      align: 'center',
      render: (_, { isEventTag }) => (isEventTag ? 'Yes' : 'No')
    },
    {
      title: 'Picture tag',
      dataIndex: 'isPictureTag',
      key: 'isPictureTag',      
      align: 'center',
      render: (_, { isPictureTag }) => (isPictureTag ? 'Yes' : 'No')
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
      {tags.length === 0
        ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading Data" />
        </div>
          )
        : (
        <Table
          className="admin__table"
          dataSource={tags}
          columns={columns}
          pagination={false}
          size="small"
        />
          )}
    </div>
  );
};
