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
import { pageStore } from "../../../store/pageStore/pageStore";

export const AdminBugs = () => {
  const [form] = Form.useForm();
  const [bugs, setBugs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [bugsUrls, setBugsUrls] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchBugs = async () => {
    const results = await getBugs();
    setIsloading(false);
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

  const isEditing = (record) => record.id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingId(record.id);
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

  const categoryBugMapping = {
    0: <span style={{ opacity: "0.25" }}>default</span>,
    1: <span>Spielplan</span>,
    2: <span>Shop</span>,
    3: <span>Admin</span>,
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "50px",
    },
    {
      title: "Cat",
      dataIndex: "category",
      key: "category",
      width: "120px",
      editable: true,
      render: (_, { category }) => categoryBugMapping[category],
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
      width: "100px",
      render: (_, __, index) => {
        return (
          <div
            onClick={() => {
              pageStore.setPicturesUrls([bugsUrls[index]]);
              pageStore.setPictureSelected(0);
              pageStore.setShowOverlayGallery(true);
            }}
            className="screenshotCell"
          >
            <img src={bugsUrls[index]} width={100} height={70} />
          </div>
        );
      },
    },
    {
      title: "Urgent",
      dataIndex: "isUrgent",
      key: "isUrgent",
      align: "center",
      editable: true,
      width: "100px",
      render: (_, { isUrgent }) => isUrgent && "🔥",
      filters: [
        { text: "Urgent", value: true },
        { text: "Not urgent", value: false },
      ],
      onFilter: (value, record) => record.isUrgent === value,
    },
    {
      title: "Resolved",
      dataIndex: "isResolved",
      key: "isResolved",
      align: "center",
      editable: true,
      width: "100px",
      render: (_, { isResolved }) => isResolved && "✅",
      filters: [
        { text: "Resolved", value: true },
        { text: "Not resolved", value: false },
      ],
      onFilter: (value, record) => record.isResolved === value,
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
          col.dataIndex === "category"
            ? "select"
            : col.dataIndex === "isUrgent" || col.dataIndex === "isResolved"
              ? "boolean"
              : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        options: Object.keys(categoryBugMapping).map((key) => {
          return { value: key, label: categoryBugMapping[key] };
        }),
      }),
    };
  });

  return (
    <div>
      {isLoading ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading Bugs" />
        </div>
      ) : bugs.length === 0 ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="No Bugs" />
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
