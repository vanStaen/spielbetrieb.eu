import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';

import { getUsers } from './getUsers';
import { CustomSpinner } from '../../../components/CustomSpinner/CustomSpinnner';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const results = await getUsers();
    setUsers(results);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: 'id'
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      render: (_, { language }) => language.toUpperCase()
    },
    {
      title: 'Verified Email',
      dataIndex: 'verifiedEmail',
      key: 'verifiedEmail',
      render: (_, { verifiedEmail }) => (verifiedEmail ? 'Yes' : '')
    },
    {
      title: 'Verified Identity',
      dataIndex: 'verifiedIdentity',
      key: 'verifiedIdentity',
      render: (_, { verifiedIdentity }) => (verifiedIdentity ? 'Yes' : '')
    },
    {
      title: 'Partner',
      dataIndex: 'isPartner',
      key: 'isPartner',
      render: (_, { isPartner }) => (isPartner ? 'Yes' : '')
    },
  ];

  return (
    <div>
      {users.length === 0
        ? (
        <div className="admin__centered">
          <CustomSpinner text="Loading subscribers" />
        </div>
          )
        : (
        <Table
          className="admin__table"
          dataSource={users}
          columns={columns}
          pagination={false}
        />
          )}
    </div>
  );
};
