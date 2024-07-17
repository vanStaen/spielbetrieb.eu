import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Button, Tooltip } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../../EditableCell";
import { getTags } from "../../../../store/pageStore/getTags";
import { deleteTag } from "./deleteTag";
import { updateTag } from "./updateTag";
import { addTag } from "./addTag";
import { AdminCustomSpinner } from "../../AdminCustomSpinner/AdminCustomSpinner";
import { nameParser } from "../../../../helpers/dev/nameParser";

// TODO: handle delete tag

export const AdminTags = () => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchTags = async () => {
    const results = await getTags();
    const tags = results.map((type) => {
      return {
        name_en: nameParser(type.name, "en"),
        name_de: nameParser(type.name, "de"),
        ...type,
      };
    });
    setTags(tags);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const isEditing = (record) => record.id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      validated: false,
      ...record,
    });
    setEditingId(record.id);
  };

  const cancel = async () => {
    setEditingId("");
    isNewRow && fetchTags();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteTag(id);
    await fetchTags();
  };

  const toogleValidateTag = async (id, validated) => {
    await updateTag(parseInt(id), { validated });
    await fetchTags();
  };

  const toogleFlagTag = async (id, flag, value) => {
    const newValueObject = {};
    newValueObject[flag] = value;
    await updateTag(parseInt(id), newValueObject);
    await fetchTags();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      const dataObjectNew = {
        name: `{"en":"${dataObject.name_en}", "de":"${dataObject.name_de}"}`,
        isUserTag: dataObject.isUserTag,
        isEventTag: dataObject.isEventTag,
        isPictureTag: dataObject.isPictureTag,
        isPartnerTag: dataObject.isPartnerTag,
        validated: dataObject.validated,
      };
      if (isNewRow) {
        await addTag(dataObjectNew);
      } else {
        await updateTag(id, dataObjectNew);
      }
      await fetchTags();
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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name EN",
      dataIndex: "name_en",
      key: "name_en",
      editable: true,
      sorter: (a, b) => a.name_en.localeCompare(b.name_en),
    },
    {
      title: "Name DE",
      dataIndex: "name_de",
      key: "name_de",
      editable: true,
      sorter: (a, b) => a.name_de.localeCompare(b.name_de),
    },
    {
      title: "User tag",
      dataIndex: "isUserTag",
      key: "isUserTag",
      align: "center",
      editable: true,
      render: (_, { isUserTag, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() => toogleFlagTag(id, "isUserTag", !isUserTag)}
          >
            {isUserTag ? (
              "✖️"
            ) : (
              <span style={{ filter: "grayscale(1)", opacity: 0.15 }}>✖️</span>
            )}
          </div>
        </Tooltip>
      ),
      sorter: (a, b) => a.isUserTag - b.isUserTag,
    },
    {
      title: "Event tag",
      dataIndex: "isEventTag",
      key: "isEventTag",
      align: "center",
      editable: true,
      render: (_, { isEventTag, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() => toogleFlagTag(id, "isEventTag", !isEventTag)}
          >
            {isEventTag ? (
              "✖️"
            ) : (
              <span style={{ filter: "grayscale(1)", opacity: 0.15 }}>✖️</span>
            )}
          </div>
        </Tooltip>
      ),
      sorter: (a, b) => a.isEventTag - b.isEventTag,
    },
    {
      title: "Picture tag",
      dataIndex: "isPictureTag",
      key: "isPictureTag",
      align: "center",
      editable: true,
      render: (_, { isPictureTag, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() =>
              toogleFlagTag(id, "isPictureTag", !isPictureTag)
            }
          >
            {isPictureTag ? (
              "✖️"
            ) : (
              <span style={{ filter: "grayscale(1)", opacity: 0.15 }}>✖️</span>
            )}
          </div>
        </Tooltip>
      ),
      sorter: (a, b) => a.isPictureTag - b.isPictureTag,
    },
    {
      title: "Partner tag",
      dataIndex: "isPartnerTag",
      key: "isPartnerTag",
      align: "center",
      editable: true,
      render: (_, { isPartnerTag, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() =>
              toogleFlagTag(id, "isPartnerTag", !isPartnerTag)
            }
          >
            {isPartnerTag ? (
              "✖️"
            ) : (
              <span style={{ filter: "grayscale(1)", opacity: 0.15 }}>✖️</span>
            )}
          </div>
        </Tooltip>
      ),
      sorter: (a, b) => a.isPartnerTag - b.isPartnerTag,
    },
    {
      title: "Validated",
      dataIndex: "validated",
      key: "validated",
      align: "center",
      editable: true,
      render: (_, { validated, id }) => (
        <Tooltip title="Double click to toggle this value">
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={() => toogleValidateTag(id, !validated)}
          >
            {validated ? "✅" : " ❌"}
          </div>
        </Tooltip>
      ),
      sorter: (a, b) => a.validated - b.validated,
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
            <Popconfirm
              title="Sure to delete?"
              style={{ marginRight: 8 }}
              onConfirm={() => deleteRow(record.id)}
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
            col.dataIndex === "isPictureTag" ||
            col.dataIndex === "isEventTag" ||
            col.dataIndex === "isPartnerTag" ||
            col.dataIndex === "isUserTag"
            ? "boolean"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(tags[tags.length - 1].id) + 1;
    const newRow = {
      id: newId,
      name: '{"en": "EVENT_TYPE_EN", "de": "EVENT_TYPE_DE"}',
      validated: true,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setTags([...tags, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {tags.length === 0 ? (
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
              dataSource={tags}
              columns={mergedColumns}
              pagination={false}
              size="small"
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Tag</Button>
          </div>
        </>
      )}
    </div>
  );
};
