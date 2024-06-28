import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Tooltip, Button } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../../EditableCell";
import { getLinks } from "./getLinks";
import { deleteLink } from "./deleteLink";
import { updateLink } from "./updateLink";
import { addLink } from "./addLink";
import { AdminCustomSpinner } from "../../AdminCustomSpinner/AdminCustomSpinner";

export const AdminLinks = () => {
  const [form] = Form.useForm();
  const [links, setLinks] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchLinks = async () => {
    const results = await getLinks();
    setLinks(results);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const isEditing = (record) => record.id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      shortDesc: "",
      link: "",
      category: null,
      archived: false,
      ...record,
    });
    setEditingId(record.id);
  };

  const cancel = async () => {
    setEditingId("");
    isNewRow && fetchLinks();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteLink(id);
    await fetchLinks();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      if (isNewRow) {
        await addLink(dataObject);
      } else {
        await updateLink(id, dataObject);
      }
      await fetchLinks();
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      editable: true,
      sorter: (a, b) => a.category.length - b.category.length,
      render: (_, { category, archived }) => (
        <Typography.Text delete={archived} disabled={archived}>
          {category}
        </Typography.Text>
      ),
    },
    {
      title: "Short Description",
      dataIndex: "shortDesc",
      key: "shortDesc",
      editable: true,
      render: (_, { shortDesc, archived }) => (
        <Typography.Text delete={archived} disabled={archived}>
          {shortDesc}
        </Typography.Text>
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (_, { link, archived }) =>
        archived ? (
          <Typography.Text delete disabled>
            {link}
          </Typography.Text>
        ) : (
          <Typography.Link href={link} target="_blank">
            {link}
          </Typography.Link>
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

  const categorySelectOption = [
    { label: "Team Organisation", value: "Team Organisation" },
    { label: "Marketing", value: "Marketing" },
    { label: "Finance", value: "Finance" },
    { label: "Legal", value: "Legal" },
    { label: "Parties", value: "Parties" },
    { label: "Tech", value: "Tech" },
    { label: "Other", value: "Other" },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "archived"
            ? "boolean"
            : col.dataIndex === "category"
              ? "select"
              : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        options: col.dataIndex === "category" && categorySelectOption,
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(links[links.length - 1].id) + 1;
    const newRow = {
      id: newId,
      shortDesc: "",
      link: "",
      category: null,
      archived: false,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setLinks([...links, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {links.length === 0 ? (
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
              dataSource={links}
              columns={mergedColumns}
              pagination={false}
              size="small"
              scroll={{
                x: 1400,
              }}
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Link</Button>
          </div>
        </>
      )}
    </div>
  );
};
