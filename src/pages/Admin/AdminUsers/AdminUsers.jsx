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
      key: 'id',    
      align: 'center',
      width: '50px',
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
           👔 <b>{userName}</b>
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
      align: 'center',
      width: '80px',
      render: (_, { language }) => language.toUpperCase()
    },
    {
      title: 'Verified Email',
      dataIndex: 'verifiedEmail',
      key: 'verifiedEmail',
      align: 'center',
      width: '80px',
      render: (_, { verifiedEmail }) => (verifiedEmail ? '✅' : '')
    },
    {
      title: 'Verified Identity',
      dataIndex: 'verifiedIdentity',
      key: 'verifiedIdentity', 
      align: 'center',
      width: '80px',
      render: (_, { verifiedIdentity }) => (verifiedIdentity ? '✅' : '')
    },
    {
      title: 'Partner',
      dataIndex: 'isPartner',
      key: 'isPartner', 
      align: 'center',
      width: '80px',
      render: (_, { isPartner }) => (isPartner ? '✅' : '')
    }
  ];

  return (
    <div>
      {users.length === 0
        ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading users" />
        </div>
          )
        : (
        <Table
          className="admin__table"
          dataSource={users}
          columns={columns}
          pagination={false} 
          size="small"
        />
          )}
    </div>
  );
};
