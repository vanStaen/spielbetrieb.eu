import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Button } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../../EditableCell";
import { getEventtypes } from "../../../../store/spielplanStore/getEventtypes";
import { deleteEventtype } from "./deleteEventtype";
import { updateEventtype } from "./updateEventtype";
import { addEventtype } from "./addEventtype";
import { AdminCustomSpinner } from "../../AdminCustomSpinner/AdminCustomSpinner";
import { nameParser } from "../../../../helpers/dev/nameParser";

export const AdminEventtypes = () => {
  const [form] = Form.useForm();
  const [eventtypes, setEventtypes] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchEventtypes = async () => {
    const results = await getEventtypes();
    const eventtypes = results.map((type) => {
      return {
        name_en: nameParser(type.name, "en"),
        name_de: nameParser(type.name, "de"),
        ...type,
      };
    });
    setEventtypes(eventtypes);
  };

  useEffect(() => {
    fetchEventtypes();
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
    isNewRow && fetchEventtypes();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteEventtype(id);
    await fetchEventtypes();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      const dataObjectNew = {
        name: `{"en":"${dataObject.name_en}", "de":"${dataObject.name_de}"}`,
        color: parseInt(dataObject.color),
        validated: dataObject.validated,
      };
      if (isNewRow) {
        await addEventtype(dataObjectNew);
      } else {
        await updateEventtype(id, dataObjectNew);
      }
      await fetchEventtypes();
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
      title: "Color",
      dataIndex: "color",
      key: "color",
      align: "center",
      editable: true,
      render: (_, { color }) =>
        color === 1 ? (
          <div style={{ color: "white", backgroundColor: "#477778" }}>1</div>
        ) : color === 2 ? (
          <div style={{ color: "white", backgroundColor: "#2F4F4F" }}>2</div>
        ) : color === 3 ? (
          <div style={{ color: "white", backgroundColor: "#2C3E50" }}>3</div>
        ) : color === 4 ? (
          <div style={{ color: "white", backgroundColor: "#C99A86" }}>4</div>
        ) : color === 5 ? (
          <div style={{ color: "white", backgroundColor: "#CEA032" }}>5</div>
        ) : color === 6 ? (
          <div style={{ color: "white", backgroundColor: "#922B21" }}>6</div>
        ) : (
          "none"
        ),
    },
    {
      title: "Validated",
      dataIndex: "validated",
      key: "validated",
      align: "center",
      render: (_, { validated }) => (validated ? "✅" : "✖️"),
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
          col.dataIndex === "validated"
            ? "boolean"
            : col.dataIndex === "color"
              ? "number"
              : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(eventtypes[eventtypes.length - 1]._id) + 1;
    const newRow = {
      _id: newId,
      name: '{"en": "EVENT_TYPE_EN", "de": "EVENT_TYPE_DE"}',
      validated: true,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setEventtypes([...eventtypes, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {eventtypes.length === 0 ? (
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
              dataSource={eventtypes}
              columns={mergedColumns}
              pagination={false}
              size="small"
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Event type</Button>
          </div>
        </>
      )}
    </div>
  );
};
