import React, { useState, useEffect } from "react";
import {
  notification,
  Modal,
  Button,
  Form,
  Select,
  Switch,
  Row, 
  Col,
  Input,
  DatePicker,
} from "antd";

import { addEvent } from './addEvent';
import { nameParser } from '../../helpers/nameParser';
import { getEventtypes } from '../../pages/Admin/AdminData/AdminEventtypes/getEventtypes';
import { getLocations } from '../../pages/Admin/AdminData/AdminLocations/getLocations';
import { getTags } from '../../pages/Admin/AdminData/AdminTags/getTags';
import { userStore } from "../../store/userStore/userStore";

import "./EventForm.less";

export const EventForm = (props) => {
  const { showEventForm, setShowEventForm, data, reload, isEdit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [eventtypes, setEventtypes] = useState(null);
  const [locations, setLocations] = useState(null);
  const [tags, setTags] = useState(null);
  const [isNewLocation, setIsNewLocation] = useState(false);
  const [isPrivateEvent, setIsPrivateEvent] = useState(false);
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const fetchEventtypes = async () => {
    const results = await getEventtypes();
    const eventtypes = results.map(type => {
      if (type.validated === false) {
        return
      };
      return {
      value: type._id,
      label: nameParser(type.name, userStore.language.toLowerCase()),
      }
    })  
    setEventtypes(eventtypes);
  };

  const fetchLocations = async () => {
    const results = await getLocations();
    const locationOptions = results.map(location => {
      if (location.validated === false) {
        return
      };
      return {
      value: location._id,
      label: location.name,
      }
    })  
    locationOptions.push({
      value: 0,
      label: <span style={{opacity: '.5'}}>new location</span>})
    setLocations(locationOptions);
  };

  const fetchtags = async () => {
    const results = await getTags();
    const tags = results.map(tag => {
      if (tag.validated === false || tag.eventTag === false) {
        return
      };
      return {
        value: tag._id,
        label: nameParser(tag.name, userStore.language.toLowerCase()),
      }
    })  
    setTags(tags);
  };

  useEffect(() => {
    fetchEventtypes();
    fetchLocations();
    fetchtags();
    console.log("data", data);
  }, []);

  const onCancel = () => {
    form.resetFields();
    setShowEventForm(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const dataObject = await form.validateFields();
    dataObject.private = dataObject.isPrivate;
    delete dataObject.isPrivate;
    console.log(dataObject);
    try {
      /* 
      await addEvent( 
        { 
          isPartner: values.isPartner, 
          eventtype:
          location:
          locationName:
          locationAddress:
          title:
          description:
          fromDate: values.eventDate[0],
          untilDate: values.eventDate[1],
          eventTags: values.tags
        }
      ); */
    } catch (e) {
      notification.error({
        message: `Error: ${e.toString()}`,
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
    setLoading(false);
    setShowEventForm(false);
  };

  /*
    TODO: 
    pictures: [String]
    locationCoordinates: String
    attendees: [Int]
    invited: [Int]
    admin: [Int]
  */

  return (
      <Modal
        open={showEventForm}
        centered
        title={isEdit ? '🛠️ Edit your event' : '🎉 Create a new event'}
        onOk={onFinish}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="horizontal"
          size="small"
          onFinish={onFinish}
          name="event-form"
          initialValues={data}
        >
        <div style={{ marginTop: 15 }}></div>

        <Row gutter={16}>
          <Col span={12 }>
            <Form.Item name="eventtypes" >
                <Select
                  options={eventtypes}
                  placeholder="Event type"
                />
              </Form.Item>
          </Col>
          <Col span={12}>          
            <Form.Item name="location" >
                <Select
                  options={locations}
                  onChange={(value) => setIsNewLocation(value === 0)} 
                  placeholder="Event location"
                />
              </Form.Item>
          </Col>    
        </Row>        

      {isNewLocation && 
      <>
        <Form.Item name="locationName">
            <Input placeholder="Name of the Loxcation"/>
        </Form.Item>      
        <Form.Item name="locationAddress" >
            <TextArea 
              autoSize={{ minRows: 2, maxRows: 6 }} 
              placeholder="Location's address"
            />
        </Form.Item>
      </>    
      }     
      <Form.Item name="title" >
          <Input placeholder="Location's title"/>
      </Form.Item>      
      <Form.Item name="description">
          <TextArea 
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder={"Location's description"}
          />
      </Form.Item>  
      <Form.Item name="eventDate">
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="DD-MM-YYYY HH:mm"
          style={{width: '100%'}}
          placeholder={['Event start-date', 'Event end-date']}
          />
      </Form.Item>  
      <Form.Item name="tags">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select some tags"
          options={tags}
        />
      </Form.Item>

      <Row>
        <Col span={9}>
          <Form.Item
              label={<div className="eventForm__whiteText">Allow anonym?</div>}
              name="allowAnonymous"
            >
              <Switch 
                checkedChildren='Yes'
                unCheckedChildren='No'
              /> 
            </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
              label={<div className="eventForm__whiteText">Private?</div>}
              name="isPrivate"
            >
              <Switch 
                checkedChildren='Yes'
                unCheckedChildren='No'
                onChange={(value) => setIsPrivateEvent(value)}
              /> 
          </Form.Item>
        </Col>
        <Col span={8}>
          {isPrivateEvent &&
              <Form.Item
                label={<div className="eventForm__whiteText">Forwardable?</div>}
                name="forwardable"
              >
                <Switch 
                  checkedChildren='Yes'
                  unCheckedChildren='No'
                /> 
              </Form.Item>
            }
          </Col>
      </Row>     

          <Form.Item>
            <div className="eventForm__buttonContainer">
              <Button
                className="eventForm__cancelButton"
                htmlType="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="eventForm__submitButton"
                htmlType="submit"
                loading={loading}
              >
                Create Event
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
  );
};