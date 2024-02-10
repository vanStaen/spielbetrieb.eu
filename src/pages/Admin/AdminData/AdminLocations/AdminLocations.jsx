import React, { useState, useEffect } from 'react';
import { Form, Table, Typography, Popconfirm, Tag, Button } from 'antd';
import { EditOutlined, CloseCircleOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import { EditableCell } from '../../EditableCell';
import { getLocations } from './getLocations';
import { deleteLocation } from './deleteLocation';
import { updateLocation } from './updateLocation';
import { addLocation } from './addLocation';
import { AdminCustomSpinner } from '../../AdminCustomSpinner/AdminCustomSpinner';

export const AdminLocations = () => {
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchLocations = async () => {
    const results = await getLocations();
    setLocations(results);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const isEditing = (record) => record._id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      description: '',
      links: [],
      address: '',
      coordinates: '',
      validated: false,
      ...record,
    });
    setEditingId(record._id);
  };

  const cancel = async () => {
    setEditingId('');
    isNewRow && fetchLocations();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteLocation(id);
    await fetchLocations();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      if (isNewRow) {
        await addLocation(dataObject);
      } else {
        await updateLocation(id, dataObject);
      }
      await fetchLocations();
      setEditingId('');
      setIsNewRow(false);
    } catch (e) {
      console.log('Error while saving:', e);
    }
  };
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
      width: '200px',
      editable: true,
      render: (_, { links }) => (
        <>
          {links.map((link) => {
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',     
      editable: true, 
    },
    {
      title: 'Coordinates',
      dataIndex: 'coordinates',
      key: 'coordinates',
      width: '150px',
      editable: true,   
    },
    {
      title: 'Validated',
      dataIndex: 'validated',
      key: 'validated',      
      align: 'center',
      render: (_, { validated }) => (validated ? '✅' : '✖️'),
      editable: true,
    },
    {
      title: <span style={{opacity: ".2"}}>Edit</span>,
      dataIndex: 'edit',
      width: '90px',    
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record._id)} style={{ marginRight: 8 }}>
              <CheckCircleOutlined className='admin__saveLogo' />
            </Typography.Link>
            {" "}
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              <CloseCircleOutlined className='admin__cancelLogo' />           
            </Typography.Link>

          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingId !== ''} style={{ marginRight: 8 }} onClick={() => edit(record)}>
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'validated' ? 'boolean' : col.dataIndex === 'links' ? 'stringObject' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(locations[locations.length-1]._id) + 1;
    const newRow = {
      _id: newId,
      name: '',
      description: '',
      links: [],
      address: '',
      coordinates: '',
      validated: true,
    };
    form.setFieldsValue({
      ...newRow,
    });
    setLocations([...locations, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {locations.length === 0
        ? (
            <div className="admin__centered">
              <AdminCustomSpinner text="Loading Data" />
            </div>
          )
        : (
          <>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                className="admin__table"
                dataSource={locations}
                columns={mergedColumns}
                pagination={false}
                size="small"
              />
            </Form>
              <div className='admin__tableFooter'>
                <Button onClick={handleAdd}>
                  Add a new Location
                 </Button>
              </div>
          </>
          )}
    </div>
  );
};
