import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Tooltip, Button } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../../EditableCell";
import { getContacts } from "./getContacts";
import { deleteContact } from "./deleteContact";
import { updateContact } from "./updateContact";
import { addContact } from "./addContact";
import { AdminCustomSpinner } from "../../AdminCustomSpinner/AdminCustomSpinner";

export const AdminContacts = () => {
  const [form] = Form.useForm();
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchContacts = async () => {
    const results = await getContacts();
    setContacts(results);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const isEditing = (record) => record.id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      details: "",
      archived: false,
      ...record,
    });
    setEditingId(record.id);
  };

  const cancel = async () => {
    setEditingId("");
    isNewRow && fetchContacts();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteContact(id);
    await fetchContacts();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      if (isNewRow) {
        await addContact(dataObject);
      } else {
        await updateContact(id, dataObject);
      }
      await fetchContacts();
      setEditingId("");
      setIsNewRow(false);
    } catch (e) {
      console.log("Error while saving:", e);
    }
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "50px",
      render: (_, { id, archived }) => (
        <Typography.Text delete={archived} disabled={archived}>
          {id}
        </Typography.Text>
      ),
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, { name, archived }) => (
        <Typography.Text delete={archived} disabled={archived}>
          {name}
        </Typography.Text>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, { email, archived }) => (
        <Typography.Text delete={archived} disabled={archived}>
          {email}
        </Typography.Text>
      ),
      editable: true,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (_, { details, archived }) => (
        <Typography.Text delete={archived} disabled={archived}>
          {details}
        </Typography.Text>
      ),
      editable: true,
    },
    {
      title: "Added by",
      dataIndex: "user",
      key: "user",
      render: (_, { user, archived }) => (
        <Typography.Text delete={archived} disabled={archived}>
          {user.userName}
        </Typography.Text>
      ),
      editable: true,
    },
    {
      title: "Archived",
      dataIndex: "archived",
      key: "archived",
      align: "center",
      width: "90px",
      render: (_, { archived }) => (archived ? "☠️" : ""),
      editable: true,
    },
    {
      title: <span style={{ opacity: ".2" }}>Edit</span>,
      dataIndex: "edit",
      width: "90px",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              <CheckCircleOutlined className="admin__saveLogo" />
            </Typography.Link>{" "}
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              <CloseCircleOutlined className="admin__cancelLogo" />
            </Typography.Link>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingId !== ""}
              style={{ marginRight: 8 }}
              onClick={() => edit(record)}
            >
              <EditOutlined className="admin__editLogo" />
            </Typography.Link>{" "}
            {!record.archived ? (
              <Tooltip title={"Archive link first"}>
                <DeleteOutlined
                  style={{ cursor: "not-allowed" }}
                  className={"admin__editLogo admin__disabled"}
                />
              </Tooltip>
            ) : (
              <Popconfirm
                title="Sure to delete?"
                style={{ marginRight: 8 }}
                onConfirm={() => deleteRow(record.id)}
              >
                <DeleteOutlined className="admin__editLogo" />
              </Popconfirm>
            )}
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "archived" ? "boolean" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        options: null,
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(contacts[contacts.length - 1].id) + 1;
    const newRow = {
      id: newId,
      name: "",
      email: "",
      details: "",
      archived: false,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setContacts([...contacts, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {contacts.length === 0 ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading Data" />
        </div>
      ) : (
        <>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              className="admin__table"
              dataSource={contacts}
              columns={mergedColumns}
              pagination={false}
              size="small"
              scroll={{
                x: 1400,
              }}
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Contact</Button>
          </div>
        </>
      )}
    </div>
  );
};
