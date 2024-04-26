import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Button } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../../EditableCell";
import { getDresscodes } from "../../../../store/spielplanStore/getDresscodes";
import { deleteDresscode } from "./deleteDresscode";
import { updateDresscode } from "./updateDresscode";
import { addDresscode } from "./addDresscode";
import { AdminCustomSpinner } from "../../AdminCustomSpinner/AdminCustomSpinner";
import { nameParser } from "../../../../helpers/dev/nameParser";

export const AdminDresscodes = () => {
  const [form] = Form.useForm();
  const [dresscodes, setDresscodes] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchDresscodes = async () => {
    const results = await getDresscodes();
    const dresscodes = results.map((type) => {
      return {
        name_en: nameParser(type.name, "en"),
        name_de: nameParser(type.name, "de"),
        ...type,
      };
    });
    setDresscodes(dresscodes);
  };

  useEffect(() => {
    fetchDresscodes();
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
    isNewRow && fetchDresscodes();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteDresscode(id);
    await fetchDresscodes();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      const dataObjectNew = {
        name: `{"en":"${dataObject.name_en}", "de":"${dataObject.name_de}"}`,
        isUserDresscode: dataObject.isUserDresscode,
        isEventDresscode: dataObject.isEventDresscode,
        isPictureDresscode: dataObject.isPictureDresscode,
        validated: dataObject.validated,
      };
      if (isNewRow) {
        await addDresscode(dataObjectNew);
      } else {
        await updateDresscode(id, dataObjectNew);
      }
      await fetchDresscodes();
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
      title: "Name EN",
      dataIndex: "name_en",
      key: "name_en",
      editable: true,
    },
    {
      title: "Name DE",
      dataIndex: "name_de",
      key: "name_de",
      editable: true,
    },
    {
      title: "Media",
      dataIndex: "Media",
      key: "Media",
      editable: true,
    },
    {
      title: "Validated",
      dataIndex: "validated",
      key: "validated",
      align: "center",
      editable: true,
      render: (_, { validated }) => (validated ? "✅" : "❌"),
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
        inputType: col.dataIndex === "validated" ? "boolean" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(dresscodes[dresscodes.length - 1]._id) + 1;
    const newRow = {
      _id: newId,
      name: '{"en": "EVENT_TYPE_EN", "de": "EVENT_TYPE_DE"}',
      validated: true,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setDresscodes([...dresscodes, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {dresscodes.length === 0 ? (
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
              dataSource={dresscodes}
              columns={mergedColumns}
              pagination={false}
              size="small"
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Dresscode</Button>
          </div>
          <br />
        </>
      )}
    </div>
  );
};
