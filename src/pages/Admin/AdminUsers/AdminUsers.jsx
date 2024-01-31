import React, { useState, useEffect } from 'react';
import { Table, Tag, Tooltip } from 'antd';

import { getUsers } from './getUsers';
import { AdminCustomSpinner } from '../AdminCustomSpinner/AdminCustomSpinner';

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
      key: 'userName',
      render: (_, { userName, isAdmin, adminRoles }) => isAdmin
        ? <>
        <Tooltip
          placement="left"
          overlayStyle={{ maxWidth: '700px' }}
          title={
          <>🔥&nbsp;
            <span style={{ color: '#666' }}>Admin roles:&nbsp;&nbsp;</span>
            {adminRoles.map((role) => {
              return (
                <Tag
                  color="#333"
                  key={role}
                  bordered={false}
                >
                  {role}
                </Tag>
              );
            })}
           </>}>
            <b>{userName}</b>
         </Tooltip></>
        : userName
    },
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName'
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
    }
  ];

  return (
    <div>
      {users.length === 0
        ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading subscribers" />
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
