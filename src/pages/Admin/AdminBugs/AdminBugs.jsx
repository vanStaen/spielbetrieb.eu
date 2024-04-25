import React, { useState, useEffect } from "react";
import { Form, Table, Typography, Popconfirm } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../EditableCell";
import { getBugs } from "./getBugs";
import { deleteBug } from "./deleteBug";
import { updateBug } from "./updateBug";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { getPictureUrl } from "../../../helpers/picture/getPictureUrl";

export const AdminBugs = () => {
  const [form] = Form.useForm();
  const [bugs, setBugs] = useState([]);
  const [bugsUrls, setBugsUrls] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchBugs = async () => {
    const results = await getBugs();
    setBugs(results);
  };

  const getUrlsFromPicturePath = async (bugs) => {
    const urls = await Promise.all(
      bugs.map((bug) => {
        return getPictureUrl(`${bug.screenshot}`, "bugs");
      }),
    );
    setBugsUrls(urls);
  };

  useEffect(() => {
    getUrlsFromPicturePath(bugs);
  }, [bugs]);

  useEffect(() => {
    fetchBugs();
  }, []);

  const isEditing = (record) => record._id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingId(record._id);
  };

  const cancel = async () => {
    setEditingId("");
    isNewRow && fetchBugs();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteBug(id);
    await fetchBugs();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      const dataObjectNew = {
        desc: dataObject.desc,
        category: dataObject.category,
        isUrgent: dataObject.isUrgent,
        isResolved: dataObject.isResolved,
      };
      await updateBug(id, dataObjectNew);
      await fetchBugs();
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
      title: "Desc",
      dataIndex: "desc",
      key: "desc",
      editable: true,
    },
    {
      title: "Screenshot",
      dataIndex: "url",
      key: "url",
      editable: false,
      render: (_, { _id }, index) => {
        return (
          <div>
            <img src={bugsUrls[index]} width={100} />
          </div>
        );
      },
    },
    {
      title: "Urgent",
      dataIndex: "isUrgent",
      key: "isUrgent",
      editable: true,
    },
    {
      title: "Resolved",
      dataIndex: "isResolved",
      key: "isResolved",
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
          col.dataIndex === "isUrgend" || col.dataIndex === "isResolved"
            ? "boolean"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      {bugs.length === 0 ? (
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
              dataSource={bugs}
              columns={mergedColumns}
              pagination={false}
              size="small"
            />
          </Form>
        </>
      )}
    </div>
  );
};
