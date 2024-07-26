import React, { useState, useEffect } from "react";
import { Popconfirm, Table, Tag, Tooltip, Col, Row, Typography } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { getAllPartners } from "./getAllPartners";
import { updatePendingPartner } from "./updatePendingPartner";
import { updatePartnerAsAdmin } from "./updatePartnerAsAdmin";
import { deletePartnerAsAdmin } from "./deletePartnerAsAdmin";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { getPictureUrl } from "../../../helpers/picture/getPictureUrl";
import { pageStore } from "../../../store/pageStore/pageStore";
import { nameParser } from "../../../helpers/dev/nameParser";
import { getUserNames } from "../AdminEvents/getUserNames";
import { archivePartner } from "./archivePartner";

export const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [partnersAvatarUrls, setPartnersAvatarUrls] = useState([]);
  const [userNames, setUserNames] = useState(null);
  const navigate = useNavigate();

  const fetchAllPartners = async () => {
    const results = await getAllPartners();
    setPartners(results);
  };

  const fetchUrlsFromPicturePath = async () => {
    const urls = await Promise.all(
      partners.map((partner) => {
        if (!partner.avatar) {
          return null;
        }
        const bucket = partner.pending ? "temp" : "partners";
        return getPictureUrl(`${partner.avatar}_t`, bucket);
      }),
    );
    setPartnersAvatarUrls(urls);
  };

  const fetchUserNames = async () => {
    const userNames = await getUserNames();
    setUserNames(userNames);
  };

  useEffect(() => {
    fetchAllPartners();
    fetchUserNames();
  }, []);

  useEffect(() => {
    fetchUrlsFromPicturePath();
  }, [partners]);

  const deletePartner = async (id) => {
    await deletePartnerAsAdmin(id);
    fetchAllPartners();
  };

  const validatePartner = async (id) => {
    await updatePendingPartner(parseInt(id));
    fetchAllPartners();
  };

  const toogleSuspendPartner = async (id, suspended) => {
    await updatePartnerAsAdmin(parseInt(id), { suspended });
    fetchAllPartners();
  };

  const toogleArchivedPartner = async (id, archived) => {
    await archivePartner(parseInt(id), archived);
    fetchAllPartners();
  };

  const columns = [
    /* {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
    }, */
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "100px",
      render: (_, { userName }, index) => {
        const handlePartnerContainerClick = () => {
          navigate(`/partner/${userName}`, { relative: "path" });
        };
        if (!partnersAvatarUrls[index]) {
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
              src={partnersAvatarUrls[index]}
              width="100px"
              height="100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name, description, partnerTags, userName }) => {
        return (
          <div>
            <div>
              <Link to={`../partner/${userName}`}>{name}</Link>
            </div>
            <div>{description}</div>
            <div className="admmin__tags">
              {partnerTags?.map((tagId) => {
                const tagData = pageStore.tags.find(
                  (tag) => parseInt(tag.id) === tagId,
                );
                const tagName = `${nameParser(tagData?.name, "en")}${!tagData?.validated ? ` (pending review)` : ""}`;
                return (
                  <Tag
                    key={tagId}
                    bordered={false}
                    style={{
                      background:
                        !tagData?.validated && "rgba(178, 34, 34, .75)",
                      color: !tagData?.validated && "white",
                    }}
                  >
                    #{tagName || <i> Loading</i>}
                  </Tag>
                );
              })}
            </div>
          </div>
        );
      },
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      render: (_, { admin }) => (
        <>
          {admin.map((admin) => {
            const adminName = userNames?.filter(
              (user) => parseInt(user.id) === admin,
            )[0]?.userName;
            const handleAdminClick = () => {
              navigate(`../user/${adminName}`, { relative: "path" });
            };
            return (
              <Tag
                key={admin}
                bordered={false}
                onClick={handleAdminClick}
                className="admin__tagLink"
              >
                {adminName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Suspended",
      dataIndex: "suspended",
      key: "suspended",
      align: "center",
      width: "100px",
      render: (_, { suspended, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() => toogleSuspendPartner(id, !suspended)}
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
      title: "Archived",
      dataIndex: "archived",
      key: "archived",
      align: "center",
      width: "90px",
      render: (_, { archived, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() => toogleArchivedPartner(id, !archived)}
          >
            {archived ? (
              "☠️"
            ) : (
              <span style={{ filter: "grayscale(1)", opacity: 0.25 }}>☠️</span>
            )}
          </div>
        </Tooltip>
      ),
    },

    {
      title: "Validated",
      dataIndex: "pending",
      key: "pending",
      align: "center",
      render: (_, { pending, id }) =>
        pending ? (
          <Tooltip title="Double click to validate this Partner">
            <div
              style={{ cursor: "pointer" }}
              onDoubleClick={() => validatePartner(id)}
            >
              ⌛
            </div>
          </Tooltip>
        ) : (
          <span style={{ filter: "grayscale(1)", opacity: 0.25 }}>✅</span>
        ),
    },
    {
      title: " ",
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
            scroll={{
              x: 1000,
            }}
          />
        </>
      )}
    </div>
  );
};
