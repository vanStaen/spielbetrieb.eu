import React from 'react';
import { DatePicker, Form, Input, Switch, Select } from 'antd';

export const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {

    const inputNode = inputType === 'boolean' ? 
      <Switch size='small'/> : 
      inputType === 'stringObject' ? 
      <Select size='small' mode="tags"/> : 
      inputType === 'dateRange' ? 
      <DatePicker showTime={{ format: 'HH:mm' }} size='small' /> :
      <Input size='small'/>;

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