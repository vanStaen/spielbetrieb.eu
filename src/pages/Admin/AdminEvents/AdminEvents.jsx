import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Table,
  Typography,
  Popconfirm,
  Tag,
  Button,
  Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { getAllEvents } from "./getAllEvents";
import { deleteEvent } from "./deleteEvent";
import { getAllEventtypes } from "../../../store/spielplanStore/getAllEventtypes";
import { getTags } from "../../../store/spielplanStore/getTags";
import { getUserNames } from "./getUserNames";
import { nameParser } from "../../../helpers/dev/nameParser";
import { userStore } from "../../../store/userStore/userStore";
import { updateEvent } from "./updateEvent";

export const AdminEvents = () => {
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState(null);
  const [eventtypes, setEventtypes] = useState(null);
  const [userNames, setUserNames] = useState(null);

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

  const fetchEventtypes = async () => {
    const eventtypes = await getAllEventtypes();
    setEventtypes(eventtypes);
  };

  const fetchTags = async () => {
    const tags = await getTags();
    setTags(tags);
  };

  const fetchUserNames = async () => {
    const userNames = await getUserNames();
    setUserNames(userNames);
  };

  useEffect(() => {
    fetchEventtypes();
    fetchTags();
    fetchUserNames();
    fetchEvents();
  }, []);

  const deleteRow = async (id) => {
    await deleteEvent(id);
    await fetchEvents();
  };

  const toggleValidated = (id, validated) => {
    updateEvent(parseInt(id), { validated: !validated });
    fetchEvents();
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, { title, _id }) => (<Link to={`../event/${_id}`}>{title}</Link>)
    },
    {
      title: "From",
      dataIndex: "fromDate",
      key: "fromDate",
      width: "60px",
      align: "center",
      sorter: (a, b) => a.fromDate - b.fromDate,
      render: (_, { fromDate }) => dayjs(fromDate).format("DD-MM HH:mm"),
    },
    {
      title: "Until",
      dataIndex: "untilDate",
      key: "untilDate",
      width: "60px",
      align: "center",
      render: (_, { untilDate }) => dayjs(untilDate).format("DD-MM HH:mm"),
    },
    {
      title: "Event type",
      dataIndex: "eventtype",
      key: "eventtype",
      render: (_, { eventtype }) =>
        nameParser(
          eventtypes?.filter((e) => parseInt(e._id) === eventtype)[0]?.name,
          userStore.language.toLowerCase(),
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "80px",
      render: (_, { description }) => (
        <Typography.Text style={{ width: 200 }} ellipsis>
          {description}
        </Typography.Text>
      ),
    },
    {
      title: "Loc Id",
      dataIndex: "location",
      key: "location",
      align: "center",
    },
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
    },
    {
      title: "Location Address",
      dataIndex: "locationAddress",
      key: "locationAddress",
      width: "150px",
    },
    {
      title: "Location Coordinates",
      dataIndex: "locationCoordinates",
      key: "locationCoordinates",
      width: "150px",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      width: "150px",
      render: (_, { admin }) => (
        <>
          {admin.map((admin) => {
            return (
              <Tag key={admin} bordered={false}>
                {
                  // TODO link to user profile
                  userNames?.filter((user) => parseInt(user._id) === admin)[0]
                    ?.userName
                }
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Event tags",
      dataIndex: "eventTags",
      key: "eventTags",
      render: (_, { eventTags }) => (
        <>
          {eventTags.map((tag) => {
            return (
              <Tag key={tag} bordered={false}>
                {nameParser(
                  tags?.filter((t) => parseInt(t._id) === tag)[0]?.name,
                  userStore.language.toLowerCase(),
                )}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
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
    },
    {
      title: "Draft",
      dataIndex: "isDraft",
      key: "isDraft",
      align: "center",
      width: "80px",
      render: (_, { isDraft }) => isDraft && "❌",
    },
    {
      title: "Validated",
      dataIndex: "validated",
      key: "validated",
      align: "center",
      width: "80px",
      render: (_, { validated, isDraft, _id }) =>

        !isDraft && (
          <Tooltip title="Double click to toggle this value">
            <div
              style={{ cursor: "pointer" }}
              onDoubleClick={() => toggleValidated(_id, validated)}
            >
              {validated
                ? "✅" : "❌"}
            </div>
          </Tooltip>
        ),
    },
    {
      title: <span style={{ opacity: ".2" }}>Actions</span>,
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Sure to delete?"
            style={{ marginRight: 8 }}
            onConfirm={() => deleteRow(record._id)}
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
          <AdminCustomSpinner text="Loading Data" />
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
            <Button >
              <Link to={`../event/add`}>Add a new Event</Link>
            </Button>
          </div>
          <br />
        </>
      )}
    </div>
  );
};
