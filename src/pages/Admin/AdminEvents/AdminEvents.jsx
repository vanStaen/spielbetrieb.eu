import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Table,
  Typography,
  Popconfirm,
  Tag,
  Button,
  Tooltip,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { getAllEvents } from "./getAllEvents";
import { deleteEvent } from "./deleteEvent";
import { getAllEventtypes } from "../../../store/spielplanStore/getAllEventtypes";
import { getUserNames } from "./getUserNames";
import { nameParser } from "../../../helpers/dev/nameParser";
import { updateEvent } from "./updateEvent";
import { pageStore } from "../../../store/pageStore/pageStore";
import { pictureOrPlaceholder } from "../../../helpers/picture/pictureOrPlaceholder";

export const AdminEvents = () => {
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [eventMediaUrls, setEventMediaUrls] = useState([]);
  const [eventtypes, setEventtypes] = useState(null);
  const [userNames, setUserNames] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const results = await getAllEvents();
    const events = results.map((event) => {
      return {
        isPrivate: event.private,
        ...event,
      };
    });
    setEvents(events);
  };

  const fetchUrlsFromPicturePath = async () => {
    const urls = await Promise.all(
      events.map((event) => {
        return pictureOrPlaceholder(event);
      }),
    );
    setEventMediaUrls(urls);
  };

  const fetchEventtypes = async () => {
    const eventtypes = await getAllEventtypes();
    setEventtypes(eventtypes);
  };

  const fetchUserNames = async () => {
    const userNames = await getUserNames();
    setUserNames(userNames);
  };

  useEffect(() => {
    fetchUrlsFromPicturePath();
  }, [events]);

  useEffect(() => {
    fetchEventtypes();
    fetchUserNames();
    fetchEvents();
  }, []);

  const deleteRow = async (id) => {
    await deleteEvent(id);
    await fetchEvents();
  };

  const toggleValidated = (id, validated) => {
    if (validated) {
      updateEvent(parseInt(id), { validated: false });
    } else {
      updateEvent(parseInt(id), { validated: true, isDraft: false });
    }
    fetchEvents();
  };

  const columns = [
    /* {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a, b) => a.id - b.id,
      render: (_, { id }) => <Link to={`../event/${id}`}>{id}</Link>,
    }, */
    {
      title: "Media",
      dataIndex: "media",
      key: "media",
      align: "center",
      render: (_, { id }, index) => {
        const handlePartnerContainerClick = () => {
          navigate(`../event/${id}`, { relative: "path" });
        };
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={handlePartnerContainerClick}
          >
            <img
              src={eventMediaUrls[index]}
              width="100px"
              height="100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "500px",
      render: (_, { description, eventTags, title, id }) => (
        <div>
          <div>
            <div>
              <Link to={`../event/${id}`}>{title}</Link>
            </div>
            <Typography.Text style={{ width: 400 }} ellipsis>
              {description}
            </Typography.Text>
          </div>
          <div className="admmin__tags">
            <Typography.Text style={{ width: 400 }} ellipsis>
              {eventTags.map((tagId) => {
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
                        !tagData.validated && "rgba(178, 34, 34, .75)",
                      color: !tagData.validated && "white",
                    }}
                  >
                    #{tagName || <i> Loading</i>}
                  </Tag>
                );
              })}
            </Typography.Text>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "fromDate",
      key: "fromDate",
      align: "center",
      width: "200px",
      // sorter: (a, b) => a.fromDate - b.fromDate,
      render: (_, { fromDate, untilDate }) => {
        if (fromDate === untilDate) {
          return dayjs(fromDate).format("DD-MM HH:mm");
        } else {
          return (
            dayjs(fromDate).format("DD-MM") +
            " " +
            dayjs(fromDate).format("HH:mm") +
            " " +
            dayjs(untilDate).format("HH:mm")
          );
        }
      },
    },
    {
      title: "Type",
      dataIndex: "eventtype",
      key: "eventtype",
      render: (_, { eventtype }) =>
        nameParser(
          eventtypes?.filter((e) => parseInt(e.id) === eventtype)[0]?.name,
          pageStore.selectedLanguage.toLowerCase(),
        ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (
        _,
        { locationName, location, locationCoordinates, locationAddress },
      ) => {
        // TODO: Click to show location page
        return (
          <Tooltip
            placement="bottom"
            title={
              <div>
                <div style={{ fontWeight: 500 }}>{locationAddress}</div>
                <div style={{ opacity: 0.5 }}>{locationCoordinates}</div>
              </div>
            }
          >
            {locationName}
          </Tooltip>
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
    /* {
      title: "Private",
      dataIndex: "isPrivate",
      key: "isPrivate",
      align: "center",
      width: "80px",
      render: (_, { isPrivate }) => isPrivate && "✖️",
    },
    {
      title: "Forwardable",
      dataIndex: "forwardable",
      key: "forwardable",
      align: "center",
      width: "80px",
      render: (_, { forwardable }) => forwardable && "✖️",
    },
    {
      title: "Allow Anonymous",
      dataIndex: "allowAnonymous",
      key: "allowAnonymous",
      align: "center",
      width: "80px",
      render: (_, { allowAnonymous }) => allowAnonymous && "✖️",
    }, */
    {
      title: "Validated",
      dataIndex: "validated",
      key: "validated",
      align: "center",
      render: (_, { validated, isDraft, id, admin }) => {
        if (!isDraft || admin.includes(17)) {
          return (
            <Tooltip title="Double click to toggle this value">
              <div
                style={{ cursor: "pointer" }}
                onDoubleClick={() => toggleValidated(id, validated)}
              >
                {validated ? "✅" : "❌"}
              </div>
            </Tooltip>
          );
        } else {
          return <Tooltip title="Still in draft">⌛</Tooltip>;
        }
      },
    },
    {
      title: " ",
      dataIndex: "action",
      align: "center",
      width: "100px",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Sure to delete?"
            style={{ marginRight: 8 }}
            onConfirm={() => deleteRow(record.id)}
          >
            <DeleteOutlined className="admin__editLogo" />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      {events.length === 0 ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading Events" />
        </div>
      ) : (
        <>
          <Form form={form} component={false}>
            <Table
              className="admin__table"
              dataSource={events}
              columns={columns}
              pagination={false}
              size="small"
              scroll={{
                x: 1000,
              }}
            />
          </Form>
          <div className="admin__tableFooter">
            <Button>
              <Link to={`../event/add`}>Add a new Event</Link>
            </Button>
          </div>
          <br />
        </>
      )}
    </div>
  );
};
