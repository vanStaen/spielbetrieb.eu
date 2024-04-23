import React, { useState, useEffect, useRef } from "react";
import { Form, Table, Typography, Button, message, Tooltip } from "antd";
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { EditableCell } from "../EditableCell";
import { getTranslations } from "./getTranslations";
import { updateTranslation } from "./updateTranslation";
import { addTranslation } from "./addTranslation";
import { AdminCustomSpinner } from "../AdminCustomSpinner/AdminCustomSpinner";
import { capitalizeFirstLetter } from "../../../helpers/manipulation/capitalizeFirstLetter";

export const AdminTranslations = () => {
  const [form] = Form.useForm();
  const [translations, setTranslations] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isNewRow, setIsNewRow] = useState(false);
  const throttling = useRef(false);

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
      ...record,
    });
    setEditingId(record._id);
  };

  const cancel = async () => {
    setEditingId("");
    isNewRow && fetchTranslations();
    setIsNewRow(false);
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      const dataObjectNew = {
        en: dataObject.en,
        de: dataObject.de,
      };
      if (isNewRow) {
        await addTranslation(dataObjectNew);
      } else {
        await updateTranslation(id, dataObjectNew);
      }
      message.success("Translation updated!");
      await fetchTranslations();
      setEditingId("");
      setIsNewRow(false);
    } catch (e) {
      console.log("Error while saving:", e);
    }
  };

  const keyDownHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (throttling.current === false) {
      throttling.current = true;
      if (keyPressed === "escape") {
        cancel();
      } else if (keyPressed === "enter") {
        save(editingId);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  const categories = translations.map((translation) => {
    return translation.category;
  });

  const categoryFilters = [...new Set(categories)].map((category) => {
    return {
      text: capitalizeFirstLetter(category),
      value: category,
    };
  });

  const keyFilters = translations.map((translation) => {
    return {
      text: translation.key,
      value: translation.key,
    };
  });

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
      editable: false,
      filters: categoryFilters,
      filterSearch: true,
      onFilter: (value, record) => record.category.startsWith(value),
      render: (_, { category }) => capitalizeFirstLetter(category),
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      editable: false,
      filters: keyFilters,
      filterSearch: true,
      onFilter: (value, record) => record.category.startsWith(value),
    },
    {
      title: "English 🇬🇧",
      dataIndex: "en",
      key: "en",
      editable: true,
      width: "30%",
      render: (_, record) => {
        return <span onClick={() => edit(record)}>{record.en}</span>;
      },
    },
    {
      title: "Deutsch 🇩🇪",
      dataIndex: "de",
      key: "de",
      editable: true,
      width: "30%",
      render: (_, record) => {
        return <span onClick={() => edit(record)}>{record.de}</span>;
      },
    },
    {
      title: <span style={{ opacity: ".2" }}>Edit</span>,
      dataIndex: "edit",
      align: "center",
      width: "8%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Tooltip
            title={
              <>
                <div>
                  Cancel with{" "}
                  <i>
                    <b>escape</b>
                  </i>
                </div>
                <div>
                  Confirm with{" "}
                  <i>
                    <b>enter</b>
                  </i>
                </div>
              </>
            }
          >
            <Typography.Link
              onClick={() => save(record._id)}
              style={{ marginRight: 8 }}
            >
              <CheckCircleOutlined className="admin__saveLogo" />
            </Typography.Link>{" "}
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              <CloseCircleOutlined className="admin__cancelLogo" />
            </Typography.Link>
          </Tooltip>
        ) : (
          <span>
            <Typography.Link
              disabled={editingId !== ""}
              onClick={() => edit(record)}
            >
              <EditOutlined className="admin__editLogo" />
            </Typography.Link>
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
        inputType: "text",
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
          {/* <div className="admin__tableFooter">
            <Button onClick={handleAdd}>Add a new Translation</Button>
          </div> */}
        </>
      )}
    </div>
  );
};
