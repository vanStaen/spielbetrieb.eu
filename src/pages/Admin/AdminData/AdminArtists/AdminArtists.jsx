import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm, Button } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../../EditableCell";
import { getArtists } from "../../../../store/spielplanStore/getArtists";
import { deleteArtist } from "./deleteArtist";
import { updateArtist } from "./updateArtist";
import { addArtist } from "./addArtist";
import { AdminCustomSpinner } from "../../AdminCustomSpinner/AdminCustomSpinner";

export const AdminArtists = () => {
  const [form] = Form.useForm();
  const [artists, setArtists] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchArtists = async () => {
    const results = await getArtists();
    setArtists(results);
  };

  useEffect(() => {
    fetchArtists();
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
    isNewRow && fetchArtists();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteArtist(id);
    await fetchArtists();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      const dataObjectNew = {
        name: dataObject.name,
        isUserArtist: dataObject.isUserArtist,
        isEventArtist: dataObject.isEventArtist,
        isPictureArtist: dataObject.isPictureArtist,
        validated: dataObject.validated,
      };
      if (isNewRow) {
        await addArtist(dataObjectNew);
      } else {
        await updateArtist(id, dataObjectNew);
      }
      await fetchArtists();
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "artistType",
      key: "artistType",
      editable: true,
    },
    {
      title: "Pictures",
      dataIndex: "pictures",
      key: "pictures",
      align: "center",
      editable: true,
    },
    {
      title: "Links",
      dataIndex: "links",
      key: "links",
      editable: true,
      render: (_, { links }) => (
        <>
          {links?.map((link) => {
            return (
              <Tag key={link} bordered={false}>
                {link}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Validated",
      dataIndex: "validated",
      key: "validated",
      align: "center",
      editable: true,
      render: (_, { validated }) => (validated ? "✅" : " ❌"),
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
            col.dataIndex === "isPictureArtist" ||
            col.dataIndex === "isEventArtist" ||
            col.dataIndex === "isUserArtist"
            ? "boolean"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(artists[artists.length - 1]._id) + 1;
    const newRow = {
      _id: newId,
      name: '{"en": "EVENT_TYPE_EN", "de": "EVENT_TYPE_DE"}',
      validated: true,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setArtists([...artists, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {artists.length === 0 ? (
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
              dataSource={artists}
              columns={mergedColumns}
              pagination={false}
              size="small"
            />
          </Form>
          <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Artist</Button>
          </div>
        </>
      )}
    </div>
  );
};
