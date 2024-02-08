import React, { useState, useEffect } from 'react';
import { Popconfirm, Table, Tag, Tooltip, Typography } from 'antd';
import { StopOutlined, DeleteOutlined } from '@ant-design/icons';

import { getUsersAsAdmin } from './getUsersAsAdmin';
import { updateUserAsAdmin } from './updateUserAsAdmin';
import { deleteUserAsAdmin } from './deleteUserAsAdmin';
import { AdminCustomSpinner } from '../AdminCustomSpinner/AdminCustomSpinner';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const results = await getUsersAsAdmin();
    setUsers(results);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const blockUser = async (id) => {
    const suspended = users.filter(user => user._id === id)[0].suspended;
    await updateUserAsAdmin(id, { suspended: !suspended });
    fetchAllUsers();
  }

  const deleteUser = async (id) => {    
    await deleteUserAsAdmin(id);
    fetchAllUsers();
  }

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
      align: 'center',
      width: '70px',
      render: (_, { language }) => language.toUpperCase()
    },
    {
      title: 'Verified Email',
      dataIndex: 'verifiedEmail',
      key: 'verifiedEmail',
      align: 'center',
      width: '70px',
      render: (_, { verifiedEmail }) => (verifiedEmail ? '✅' : '✖️')
    },
    {
      title: 'Verified Identity',
      dataIndex: 'verifiedIdentity',
      key: 'verifiedIdentity', 
      align: 'center',
      width: '70px',
      render: (_, { verifiedIdentity }) => (verifiedIdentity ? '✅' : '✖️')
    },
    {
      title: 'Partner',
      dataIndex: 'isPartner',
      key: 'isPartner', 
      align: 'center',
      width: '70px',
      render: (_, { isPartner, partnerRoles }) => isPartner
        ? <>
        <Tooltip
          placement="left"
          overlayStyle={{ maxWidth: '700px' }}
          title={
          <>🔥&nbsp;
            <span style={{ color: '#666' }}>Partner roles:&nbsp;&nbsp;</span>
            {partnerRoles.map((role) => {
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
           ✅
         </Tooltip></>
        : '✖️'
    },
    {
      title: 'Suspended',
      dataIndex: 'suspended',
      key: 'suspended', 
      align: 'center',
      width: '70px',
      render: (_, { suspended }) => (suspended ? '✅' : '✖️')
    },
    {
      title: <span style={{opacity: ".2"}}>Edit</span>,
      dataIndex: 'edit',
      width: '90px',    
      align: 'center',
      render: (_, record) => {
        return (
          <span>
            <Tooltip title="Suspend User">
              <Typography.Link disabled={record.isAdmin} style={{ marginRight: 8 }} onClick={() => blockUser(record._id)}>
                <StopOutlined className={`admin__editLogo ${!!record.isAdmin && "admin__disabled"}`} />
              </Typography.Link>
            </Tooltip>
            {" "}
            {record.isAdmin || record.isPartner ? 
                <DeleteOutlined  className={`admin__editLogo ${!!record.isAdmin && "admin__disabled"}`}  />
              :
              <Tooltip title="Delete User">
                <Popconfirm title="Sure to delete for ever this user?" style={{ marginRight: 8 }} onConfirm={() => deleteUser(record._id)}>
                  <DeleteOutlined  className="admin__editLogo" />
                </Popconfirm>
              </Tooltip>
            }
          </span>
        )
      },
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
