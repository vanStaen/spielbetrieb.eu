import React, { useState, useEffect } from "react";
import { Popconfirm, Table, Tag, Tooltip, Typography } from "antd";
import { StopOutlined, DeleteOutlined } from "@ant-design/icons";

import { getUsersAsAdmin } from "./getUsersAsAdmin";
import { updateUserAsAdmin } from "./updateUserAsAdmin";
import { deleteUserAsAdmin } from "./deleteUserAsAdmin";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { PartnerForm } from "./PartnerForm/PartnerForm";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const fetchAllUsers = async () => {
    const results = await getUsersAsAdmin();
    setUsers(results);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const blockUser = async (id) => {
    const suspended = users.filter((user) => user._id === id)[0].suspended;
    await updateUserAsAdmin(id, { suspended: !suspended });
    fetchAllUsers();
  };

  const deleteUser = async (id) => {
    await deleteUserAsAdmin(id);
    fetchAllUsers();
  };

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "id",
      align: "center",
      width: "50px",
      sorter: (a, b) => a._id - b._id,
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      width: "120px",
      sorter: (a, b) => a.userName.length - b.userName.length,
      render: (_, { userName, isAdmin, adminRoles }) =>
        isAdmin ? (
          <>
            <Tooltip
              placement="left"
              overlayStyle={{ maxWidth: "700px" }}
              title={
                <>
                  🔥&nbsp;
                  <span style={{ color: "#666" }}>Roles:&nbsp;&nbsp;</span>
                  {adminRoles?.map((role) => {
                    return (
                      <Tag color="#333" key={role} bordered={false}>
                        {role}
                      </Tag>
                    );
                  })}
                </>
              }
            >
              <b>{userName}</b>
            </Tooltip>
          </>
        ) : (
          userName
        ),
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      width: "120px",
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      key: "lastName",
      width: "120px",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      key: "email",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      align: "center",
      width: "100px",
      sorter: (a, b) => a.language.length - b.language.length,
      render: (_, { language }) => language.toUpperCase(),
    },
    {
      title: "Verified Email",
      dataIndex: "verifiedEmail",
      key: "verifiedEmail",
      align: "center",
      width: "70px",
      render: (_, { verifiedEmail }) => (verifiedEmail ? "✅" : "✖️"),
    },
    {
      title: "Verified Identity",
      dataIndex: "verifiedIdentity",
      key: "verifiedIdentity",
      align: "center",
      width: "70px",
      render: (_, { verifiedIdentity }) => (verifiedIdentity ? "✅" : "✖️"),
    },
    {
      title: "Partner",
      dataIndex: "isPartner",
      key: "isPartner",
      align: "center",
      width: "70px",
      sorter: (a, b) => a.isPartner - b.isPartner,
      render: (_, record) => (
        <div
          onClick={() => setSelectedPartner(record)}
          style={{ cursor: "pointer" }}
        >
          {record.isPartner ? (
            <>
              <Tooltip
                placement="left"
                overlayStyle={{ maxWidth: "700px" }}
                title={
                  <>
                    💼&nbsp;
                    <span style={{ color: "#666" }}>
                      Partner roles:&nbsp;&nbsp;
                    </span>
                    {record.partnerRoles?.map((role) => {
                      return (
                        <Tag color="#333" key={role} bordered={false}>
                          {role}
                        </Tag>
                      );
                    })}
                  </>
                }
              >
                ✅
              </Tooltip>
            </>
          ) : (
            "✖️"
          )}
        </div>
      ),
    },
    {
      title: "Suspended",
      dataIndex: "suspended",
      key: "suspended",
      align: "center",
      width: "100px",
      sorter: (a, b) => a.suspended - b.suspended,
      render: (_, { suspended }) => (suspended ? "🚫" : "✖️"),
    },
    {
      title: <span style={{ opacity: ".2" }}>Edit</span>,
      dataIndex: "edit",
      width: "90px",
      align: "center",
      render: (_, record) => {
        return (
          <span>
            {record.isAdmin || record.isPartner ? (
              <>
                <Tooltip
                  title={
                    record.isAdmin
                      ? "You can't suspend Admins"
                      : "Suspend Partner"
                  }
                >
                  <Typography.Link
                    disabled={record.isAdmin}
                    style={{ marginRight: 8 }}
                    onClick={() => blockUser(record._id)}
                  >
                    <StopOutlined
                      className={`admin__editLogo ${!!record.isAdmin && "admin__disabled"}`}
                    />
                  </Typography.Link>
                </Tooltip>{" "}
                <Tooltip
                  title={`You can't delete ${record.isAdmin ? "Admins" : "Partners"}`}
                >
                  <DeleteOutlined
                    style={{ cursor: "not-allowed" }}
                    className={`admin__editLogo admin__disabled`}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title={`Suspend User`}>
                  <Typography.Link
                    disabled={record.isAdmin}
                    style={{ marginRight: 8 }}
                    onClick={() => blockUser(record._id)}
                  >
                    <StopOutlined
                      className={`admin__editLogo ${!!record.isAdmin && "admin__disabled"}`}
                    />
                  </Typography.Link>
                </Tooltip>{" "}
                <Tooltip title="Delete User">
                  <Popconfirm
                    title="Sure to delete for ever this user?"
                    style={{ marginRight: 8 }}
                    onConfirm={() => deleteUser(record._id)}
                  >
                    <DeleteOutlined className="admin__editLogo" />
                  </Popconfirm>
                </Tooltip>
              </>
            )}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      {users.length === 0 ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading users" />
        </div>
      ) : (
        <>
          {selectedPartner && (
            <PartnerForm
              selectedPartner={selectedPartner}
              setSelectedPartner={setSelectedPartner}
              fetchAllUsers={fetchAllUsers}
            />
          )}
          <Table
            className="admin__table"
            dataSource={users}
            columns={columns}
            pagination={false}
            size="small"
            scroll={{
              x: 1000,
            }}
          />
        </>
      )}
    </div>
  );
};
