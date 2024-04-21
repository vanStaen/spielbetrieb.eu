import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Button, Tag } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../EditableCell";
import { getTranslations } from "./getTranslations";
import { deleteTranslation } from "./deleteTranslation";
import { updateTranslation } from "./updateTranslation";
import { addTranslation } from "./addTranslation";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";

export const AdminTranslations = () => {
  const [form] = Form.useForm();
  const [translations, setTranslations] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchTranslations = async () => {
    const results = await getTranslations();
    setTranslations(results);
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  const isEditing = (record) => record._id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      validated: false,
      ...record,
    });
    setEditingId(record._id);
  };

  const cancel = async () => {
    setEditingId("");
    isNewRow && fetchTranslations();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteTranslation(id);
    await fetchTranslations();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      const dataObjectNew = {
        name: dataObject.name,
        isUserTranslation: dataObject.isUserTranslation,
        isEventTranslation: dataObject.isEventTranslation,
        isPictureTranslation: dataObject.isPictureTranslation,
        validated: dataObject.validated,
      };
      if (isNewRow) {
        await addTranslation(dataObjectNew);
      } else {
        await updateTranslation(id, dataObjectNew);
      }
      await fetchTranslations();
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
      width: "50px",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      editable: true,
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      editable: true,
    },
    {
      title: "English",
      dataIndex: "en",
      key: "en",
      editable: true,
    },
    {
      title: "Deutsch",
      dataIndex: "de",
      key: "de",
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
          col.dataIndex === "validated" ||
          col.dataIndex === "isPictureTranslation" ||
          col.dataIndex === "isEventTranslation" ||
          col.dataIndex === "isUserTranslation"
            ? "boolean"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(translations[translations.length - 1]._id) + 1;
    const newRow = {
      _id: newId,
      name: '{"en": "EVENT_TYPE_EN", "de": "EVENT_TYPE_DE"}',
      validated: true,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setTranslations([...translations, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {translations.length === 0 ? (
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
              dataSource={translations}
              columns={mergedColumns}
              pagination={false}
              size="small"
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Translation</Button>
          </div>
        </>
      )}
    </div>
  );
};