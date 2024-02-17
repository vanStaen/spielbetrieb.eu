import React from "react";
import { DatePicker, Form, Input, Switch, Select, InputNumber } from "antd";

export const EditableCell = ({
  editing,
  dataIndex,
  inputType,
  children,
  options,
  ...restProps
}) => {
  const inputNode =
    inputType === "boolean" ? (
      <Switch size="small" />
    ) : inputType === "select" ? (
      <Select size="small" options={options} />
    ) : inputType === "stringObject" ? (
      <Select size="small" mode="tags" />
    ) : inputType === "dateRange" ? (
      <DatePicker showTime={{ format: "HH:mm" }} size="small" />
    ) : inputType === "number" ? (
      <InputNumber size="small" />
    ) : (
      <Input size="small" />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
