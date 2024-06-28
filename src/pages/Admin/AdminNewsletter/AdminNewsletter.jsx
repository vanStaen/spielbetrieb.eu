import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";

import { getSubscribers } from "./getSubscribers";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";

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
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "50px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (_, { language }) => language.toUpperCase(),
    },
    {
      title: "Lists",
      dataIndex: "lists",
      key: "lists",
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
      ),
    },
    {
      title: "Interests",
      key: "interests",
      dataIndex: "interests",
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
      ),
    },
    {
      title: "Verified",
      dataIndex: "verifiedEmail",
      key: "verified",
      align: "center",
      width: "80px",
      render: (_, { verifiedEmail }) => (verifiedEmail ? "✅" : "✖️"),
    },
  ];

  return (
    <div>
      {subscribers.length === 0 ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading subscribers" />
        </div>
      ) : (
        <Table
          className="admin__table"
          dataSource={subscribers}
          columns={columns}
          pagination={false}
          size="small"
        />
      )}
    </div>
  );
};
