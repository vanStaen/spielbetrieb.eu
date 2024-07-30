import React, { useState, useEffect } from "react";
import { Popconfirm, Table, Tag, Tooltip } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { getUsersAsAdmin } from "./getUsersAsAdmin";
import { updateUserAsAdmin } from "./updateUserAsAdmin";
import { deleteUserAsAdmin } from "./deleteUserAsAdmin";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { getPictureUrl } from "../../../helpers/picture/getPictureUrl";

// TODO2: show archived account
// TODO2: Delete vs archive?
// TODO2: On delete, delete all connected data (eg friends, picture, followers ...)

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersAvatarUrls, setUsersAvatarUrls] = useState([]);
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    const results = await getUsersAsAdmin();
    setUsers(results);
  };

  const fetchUrlsFromPicturePath = async () => {
    const urls = await Promise.all(
      users.map((user) => {
        if (!user.avatar) {
          return null;
        }
        return getPictureUrl(`${user.avatar}_t`, "users");
      }),
    );
    setUsersAvatarUrls(urls);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    fetchUrlsFromPicturePath();
  }, [users]);

  const toogleSuspendPartner = async (id, value) => {
    await updateUserAsAdmin(id, { suspended: value });
    fetchAllUsers();
  };

  const deleteUser = async (id) => {
    await deleteUserAsAdmin(id);
    fetchAllUsers();
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "100px",
      render: (_, { userName }, index) => {
        const handlePartnerContainerClick = () => {
          navigate(`/user/${userName}`, { relative: "path" });
        };
        if (!usersAvatarUrls[index]) {
          return (
            <div
              style={{ cursor: "pointer" }}
              onClick={handlePartnerContainerClick}
              className="admin__avatarPlaceholder"
            >
              <UserOutlined />
            </div>
          );
        }
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={handlePartnerContainerClick}
          >
            <img
              src={usersAvatarUrls[index]}
              width="100px"
              height="100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      },
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (
        _,
        { userName, isAdmin, adminRoles, firstName, lastName, email },
      ) =>
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
              <div>
                <b>{userName}</b>
              </div>
              <div>
                {firstName} {lastName}
              </div>
              <div>{email}</div>
            </Tooltip>
          </>
        ) : (
          <div>
            <div>
              <b>{userName}</b>
            </div>
            <div>
              {firstName} {lastName}
            </div>
            <div>{email}</div>
          </div>
        ),
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      align: "center",
      render: (_, { language }) => language.toUpperCase(),
    },
    {
      title: "Verified Email",
      dataIndex: "verifiedEmail",
      key: "verifiedEmail",
      align: "center",
      render: (_, { verifiedEmail }) => verifiedEmail && "✅",
    },
    {
      title: "Verified Identity",
      dataIndex: "verifiedIdentity",
      key: "verifiedIdentity",
      align: "center",
      render: (_, { verifiedIdentity }) => verifiedIdentity && "✅",
    },
    {
      title: "Suspended",
      dataIndex: "suspended",
      key: "suspended",
      align: "center",
      render: (_, { id, suspended, isAdmin }) => {
        if (isAdmin) {
          return (
            <Tooltip title={"You can't suspend Admins"}>
              <span style={{ filter: "grayscale(1)", opacity: 0.1 }}>🚫</span>
            </Tooltip>
          );
        }
        return (
          <Tooltip title="Double click to toggle this value">
            <div
              style={{ cursor: "pointer" }}
              onDoubleClick={() => toogleSuspendPartner(id, !suspended)}
            >
              {suspended ? (
                "🚫"
              ) : (
                <span style={{ filter: "grayscale(1)", opacity: 0.3 }}>🚫</span>
              )}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: " ",
      dataIndex: "edit",
      align: "center",
      width: "80px",
      render: (_, record) => {
        return (
          <span>
            {record.isAdmin ? (
              <Tooltip title={`You can't delete Admins`}>
                <DeleteOutlined
                  style={{ cursor: "not-allowed" }}
                  className={"admin__editLogo admin__disabled"}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Delete User">
                <Popconfirm
                  title="Sure to delete this user?"
                  style={{ marginRight: 8 }}
                  onConfirm={() => deleteUser(record.id)}
                >
                  <DeleteOutlined className="admin__editLogo" />
                </Popconfirm>
              </Tooltip>
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
          <AdminCustomSpinner text="Loading Users" />
        </div>
      ) : (
        <>
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
