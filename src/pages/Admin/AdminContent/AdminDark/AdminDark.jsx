import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Tag, Button } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../../EditableCell";
import { getDarks } from "./getDarks";
import { deleteDark } from "./deleteDark";
import { updateDark } from "./updateDark";
import { addDark } from "./addDark";
import { AdminCustomSpinner } from "../../AdminCustomSpinner/AdminCustomSpinner";

export const AdminDark = () => {
  const [form] = Form.useForm();
  const [darks, setDarks] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDarks = async () => {
    const results = await getDarks();
    if (results) {
      setDarks(results);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDarks();
  }, []);

  const isEditing = (record) => record._id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      number: null,
      title: "",
      description: "",
      link: "",
      artwork: "",
      tags: [],
      archived: false,
      ...record,
    });
    setEditingId(record._id);
  };

  const cancel = async () => {
    setEditingId("");
    isNewRow && fetchDarks();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteDark(id);
    await fetchDarks();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      console.log(dataObject);
      if (isNewRow) {
        await addDark(dataObject);
      } else {
        await updateDark(id, dataObject);
      }
      await fetchDarks();
      setEditingId("");
      setIsNewRow(false);
    } catch (e) {
      console.log("Error while saving:", e);
    }
  };
  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "id",
      align: "center",
      width: "30px",
    },
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      editable: true,
      width: "30px",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "200px",
      editable: true,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: "330px",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      editable: true,
      render: (_, { tags }) => (
        <>
          {tags?.map((tag) => {
            return (
              <Tag key={tag} bordered={false}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Archived",
      dataIndex: "archived",
      key: "archived",
      align: "center",
      width: "50px",
      render: (_, { archived }) => archived && "✅",
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
              onClick={() => save(record._id)}
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
            <Popconfirm
              title="Sure to delete?"
              style={{ marginRight: 8 }}
              onConfirm={() => deleteRow(record._id)}
            >
              <DeleteOutlined className="admin__editLogo" />
            </Popconfirm>
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
        inputType:
          col.dataIndex === "archived"
            ? "boolean"
            : col.dataIndex === "number"
              ? "number"
              : col.dataIndex === "links"
                ? "stringObject"
                : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(darks[darks.length - 1]._id) + 1;
    const newRow = {
      _id: newId,
      name: "",
      description: "",
      links: [],
      address: "",
      coordinates: "",
      validated: true,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setDarks([...darks, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {isLoading ? (
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
              dataSource={darks}
              columns={mergedColumns}
              pagination={false}
              size="small"
              scroll={{
                x: 1400,
              }}
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Dark issue</Button>
          </div>
        </>
      )}
    </div>
  );
};
