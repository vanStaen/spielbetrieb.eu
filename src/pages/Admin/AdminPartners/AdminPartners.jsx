import React, { useState, useEffect } from "react";
import { Popconfirm, Table, Tag, Tooltip, Col, Row, Typography } from "antd";
import { StopOutlined, DeleteOutlined } from "@ant-design/icons";

import { getAllPartners } from "./getAllPartners";
import { updatePartnerAsAdmin } from "./updatePartnerAsAdmin";
import { deletePartnerAsAdmin } from "./deletePartnerAsAdmin";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { useNavigate } from "react-router-dom";

export const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

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

  const validatePartner = async (id) => {
    await updatePartnerAsAdmin(parseInt(id), { pending: false });
    fetchAllPartners();
  };

  const toogleSuspendPartner = async (id, suspended) => {
    if (suspended) {
      await updatePartnerAsAdmin(parseInt(id), { suspended: false });
    } else {
      await updatePartnerAsAdmin(parseInt(id), { suspended: true });
    }
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
      render: (
        _,
        { name, description, partnerTags, avatar, pending, userName },
      ) => {
        // TODO Add avatar in tooltip
        const avatarUrl = avatar;

        const handlePartnerContainerClick = () => {
          navigate(`/partner/${userName}`, { relative: "path" });
        };

        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={handlePartnerContainerClick}
          >
            <Tooltip
              placement="right"
              overlayStyle={{ maxWidth: "700px" }}
              title={
                <div>
                  <div>{description}</div>
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
          </div>
        );
      },
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      align: "center",
      render: (_, { admin }) =>
        admin.map((user) => {
          return <span key={user}>{user}</span>;
        }),
    },
    {
      title: "Suspended",
      dataIndex: "suspended",
      key: "suspended",
      align: "center",
      width: "100px",
      sorter: (a, b) => a.suspended - b.suspended,
      render: (_, { suspended, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() => toogleSuspendPartner(id, suspended)}
          >
            {suspended ? (
              "🚫"
            ) : (
              <span style={{ filter: "grayscale(1)", opacity: 0.25 }}>🚫</span>
            )}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Pending",
      dataIndex: "pending",
      key: "pending",
      align: "center",
      render: (_, { pending, id }) => (
        <Tooltip title="Double click to validate this Partner">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() => validatePartner(id)}
          >
            {pending && "⌛"}
          </div>
        </Tooltip>
      ),
    },
    {
      title: <span style={{ opacity: ".2" }}>Edit</span>,
      dataIndex: "edit",
      width: "90px",
      align: "center",
      render: (_, record) => {
        return (
          <span>
            {
              <Tooltip title="Delete Partner">
                <Popconfirm
                  title="Sure to delete this partner forever?"
                  style={{ marginRight: 8 }}
                  onConfirm={() => deletePartner(record.id)}
                >
                  <DeleteOutlined className="admin__editLogo" />
                </Popconfirm>
              </Tooltip>
            }
          </span>
        );
      },
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
