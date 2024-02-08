import React, { useState, useEffect } from 'react';
import { Form, Table, Typography, Popconfirm, Tag, Button } from 'antd';
import { EditOutlined, CloseCircleOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import { EditableCell } from '../EditableCell';
import { AdminCustomSpinner } from '../AdminCustomSpinner/AdminCustomSpinner';
import { getAllEvents } from './getAllEvents';
import { deleteEvent } from './deleteEvent';
import { updateEvent } from './updateEvent';
import { addEvent } from './addEvent';

export const AdminEvents = () => {
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [isNewRow, setIsNewRow] = useState(false);

  const fetchEvents = async () => {
    const results = await getAllEvents();
    const events = results.map(event => {
      return {
      isPrivate: event.private,
      ...event
      }
    })  
    setEvents(events);
  };

  useEffect(() => {
    fetchEvents();
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
    isNewRow && fetchEvents();
    setIsNewRow(false);
  };

  const deleteRow = async (id) => {
    await deleteEvent(id);
    await fetchEvents();
  };

  const save = async (id) => {
    try {
      const dataObject = await form.validateFields();
      if (isNewRow) {
        await addEvent(dataObject);
      } else {
        await updateEvent(id, dataObject);
      }
      await fetchEvents();
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',   
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',   
    },
    {
      title: 'Location Id',
      dataIndex: 'location',
      key: 'location',   
    }, 
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      width: '150px',
      editable: true,
      render: (_, { admin }) => (
        <>
          {admin.map((admin) => {
            return (
              <Tag key={admin} bordered={false}>
                {admin}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Private',
      dataIndex: 'isPrivate',
      key: 'isPrivate',      
      align: 'center',
      width: '80px',
      render: (_, { isPrivate }) => (isPrivate ? '✅' : ''),
      editable: true,
    },
    {
      title: 'Forwardable',
      dataIndex: 'forwardable',
      key: 'forwardable',      
      align: 'center',
      width: '80px',
      render: (_, { forwardable }) => (forwardable ? '✅' : ''),
      editable: true,
    },
    {
      title: 'Allow Anonymous',
      dataIndex: 'allowAnonymous',
      key: 'allowAnonymous',      
      align: 'center',
      width: '80px',
      render: (_, { allowAnonymous }) => (allowAnonymous ? '✅' : ''),
      editable: true,
    },
    {
      title: <span style={{opacity: ".1"}}>Edit</span>,
      dataIndex: 'edit',
      width: '80px',    
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
        inputType: col.dataIndex === 'isPrivate' 
                || col.dataIndex === 'forwardable'
                || col.dataIndex === 'allowAnonymous' ? 'boolean' : col.dataIndex === 'links' ? 'stringObject' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newId = parseInt(events[events.length-1]._id) + 1;
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
    setEvents([...events, newRow]);
    setIsNewRow(true);
    setEditingId(newId);
  };

  return (
    <div>
      {events.length === 0
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
                dataSource={events}
                columns={mergedColumns}
                pagination={false}
                size="small"
              />
            </Form>
              <div className='admin__tableFooter'>
                <Button onClick={handleAdd}>
                  Add a new Event
                 </Button>
              </div>
          </>
          )}
    </div>
  );
};
