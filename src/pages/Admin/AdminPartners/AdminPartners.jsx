import React, { useState, useEffect } from "react";
import { Popconfirm, Table, Tag, Tooltip, Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { getAllPartners } from "./getAllPartners";
import { updatePartnerAsAdmin } from "./updatePartnerAsAdmin";
import { deletePartnerAsAdmin } from "./deletePartnerAsAdmin";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";

export const AdminPartners = () => {
  const [partners, setPartners] = useState([]);

  const fetchAllPartners = async () => {
    const results = await getAllPartners();
    setPartners(results);
  };

  useEffect(() => {
    fetchAllPartners();
  }, []);

  const deletePartner = async (id) => {
    await deletePartnerAsAdmin(id);
    fetchAllPartners();
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, { name, description, partnerTags, avatar, pending }) => {

        const avatarUrl = avatar;
        return (
          <div style={{ cursor: 'pointer' }}>
            <Tooltip
              placement="right"
              overlayStyle={{ maxWidth: "700px" }}
              title={
                <div>
                  <div>
                    {description}
                  </div>
                  {partnerTags?.map((tag) => {
                    return (
                      <Tag color="#333" key={tag} bordered={false}>
                        {tag}
                      </Tag>
                    );
                  })}
                </div>
              }
            >
              {name}
            </Tooltip>
          </div>)
      }
    },

    {
      title: "Pending",
      dataIndex: "pending",
      key: "pending",
      align: "center",
      render: (_, { pending }) => (pending ? "⌛" : "✖️"),
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      align: "center",
      render: (_, { admin }) =>
        admin.map((user) => {
          return (
            <span key={user}>
              {user}
            </span>
          );
        })
    },
  ];

  return (
    <div>
      {partners.length === 0 ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading partners" />
        </div>
      ) : (
        <>
          <Table
            className="admin__table"
            dataSource={partners}
            columns={columns}
            pagination={false}
            size="small"
          />
        </>
      )}
    </div>
  );
};
