import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';

import { getSubscribers } from './getSubscribers';
import { CustomSpinner } from '../../../components/CustomSpinner/CustomSpinnner';

export const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);

  const fetchNewsletterSubscriber = async () => {
    const results = await getSubscribers();
    setSubscribers(results);
  };

  useEffect(() => {
    fetchNewsletterSubscriber();
  }, []);

  const columns = [
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
      title: 'Verified',
      dataIndex: 'verifiedEmail',
      key: 'verified',
      render: (_, { verifiedEmail }) => (verifiedEmail ? 'Yes' : '')
    },
    {
      title: 'Lists',
      dataIndex: 'lists',
      key: 'lists',
      render: (_, { lists }) => (
        <>
          {lists.map((list) => {
            return (
              <Tag key={list} bordered={false}>
                {list.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: 'Interests',
      key: 'interests',
      dataIndex: 'interests',
      render: (_, { interests }) => (
        <>
          {interests.map((interest) => {
            return (
              <Tag key={interest} bordered={false}>
                {interest.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    }
  ];

  return (
    <div>
      {subscribers.length === 0
        ? (
        <div className="admin__centered">
          <CustomSpinner text="Loading subscribers" />
        </div>
          )
        : (
        <Table
          className="admin__table"
          dataSource={subscribers}
          columns={columns}
          pagination={false}
        />
          )}
    </div>
  );
};
