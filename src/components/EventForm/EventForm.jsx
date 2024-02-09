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
} from "antd";

import { addEvent } from './addEvent';
import { nameParser } from '../../helpers/nameParser';
import { getEventtypes } from '../../pages/Admin/AdminData/AdminEventtypes/getEventtypes';
import { userStore } from "../../store/userStore/userStore";

import "./EventForm.less";

export const EventForm = (props) => {
  const { showEventForm, setShowEventForm } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isPrivateEvent, setIsPrivateEvent] = useState(false);
  const [eventtypes, setEventtypes] = useState(false);

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
    console.log("eventTypes", eventtypes);
    setEventtypes(eventtypes);
  };

  useEffect(() => {
    fetchEventtypes();
  }, []);

  const onCancel = () => {
    form.resetFields();
    setShowEventForm(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      /* await updateUserAsAdmin(selectedPartner._id, 
        { isPartner: values.isPartner, partnerRoles: values.isPartner ? values.roles : null }
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
    eventtype: Int!
    title: String!
    description: String
    pictures: [String]
    location: Int
    locationName: String
    locationAddress: String
    locationCoordinates: String
    fromDate: String
    untilDate: String
    eventTags: [Int]
    attendees: [Int]
    invited: [Int]
    admin: [Int]
    */

  return (
      <Modal
        open={showEventForm}
        centered
        title='Create a new event'
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
        >
        <div style={{ marginTop: 15 }}></div>
      <Row>
        <Col className="gutter-row" span={12}>
          <Form.Item
              label={<div className="eventForm__whiteText">Event type</div>}
              name="eventtypes"
            >
              <Select
                options={eventtypes}
              />
            </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          {" "}
        </Col>    
      </Row>          

      <Row>
        <Col className="gutter-row" span={9}>
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
        <Col className="gutter-row" span={7}>
          <Form.Item
              label={<div className="eventForm__whiteText">Private?</div>}
              name="private"
            >
              <Switch 
                checkedChildren='Yes'
                unCheckedChildren='No'
                onChange={(value) => setIsPrivateEvent(value)}
              /> 
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
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