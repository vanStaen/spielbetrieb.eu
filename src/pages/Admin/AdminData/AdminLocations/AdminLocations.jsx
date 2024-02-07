import React, { useState, useEffect } from 'react';
import { Form, Table, Typography, Popconfirm } from 'antd';
import { EditOutlined, CloseCircleOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import { getLocations } from './getLocations';
import { deleteLocation } from './deleteLocation';
import { AdminCustomSpinner } from '../../AdminCustomSpinner/AdminCustomSpinner';

export const AdminLocations = () => {
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const deleteRow = async (id) => {
    await deleteLocation(id);
    await fetchLocations();
  };

  const fetchLocations = async () => {
    const results = await getLocations();
    setLocations(results);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: 'id',    
      align: 'center',
      width: '50px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
    {
      title: 'Links',
      dataIndex: 'links',
      key: 'links',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',     
      editable: true, 
    },
    {
      title: 'Coordinates',
      dataIndex: 'coordinates',
      key: 'coordinates',
      editable: true,   
    },
    {
      title: 'Validated',
      dataIndex: 'validated',
      key: 'validated',      
      align: 'center',
      render: (_, { validated }) => (validated ? 'Yes' : 'No'),
      editable: true,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      width: '80px',   
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              <CheckCircleOutlined className='admin__saveLogo' />
            </Typography.Link>
            {" "}
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              <CloseCircleOutlined className='admin__cancelLogo' />           
            </Typography.Link>

          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} style={{ marginRight: 8 }} onClick={() => edit(record)}>
              <EditOutlined className='admin__editLogo' />
            </Typography.Link>
              {" "}
            <Popconfirm title="Sure to delete?" style={{ marginRight: 8 }} onConfirm={() => deleteRow(record._id)}>
              <DeleteOutlined className='admin__editLogo' />
            </Popconfirm>
          </span>
        );
      },
    }
  ];

  return (
    <div>
      {locations.length === 0
        ? (
        <div className="admin__centered">
          <AdminCustomSpinner text="Loading Data" />
        </div>
          )
        : (
        <Table
          className="admin__table"
          dataSource={locations}
          columns={columns}
          pagination={false}
          size="small"
        />
          )}
    </div>
  );
};
