import React, { useState } from "react";
import {
  notification,
  Modal,
  Button,
  Form,
  Select,
  Switch,
} from "antd";

import { addEvent } from './addEvent';

import "./EventForm.less";

export const EventForm = (props) => {
  const { showEventForm, setShowEventForm } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
          name="mewsletter-form"
          initialValues={{
            //isPartner: selectedPartner.isPartner,
            //roles: selectedPartner.partnerRoles,
          }}
        >
          <span style={{color: 'gold'}}>TODO - work in progress</span>
          {/* <Form.Item
            label={<div className="partnerForm__whiteText">Make {`${selectedPartner.userName} (${selectedPartner.firstName} ${selectedPartner.lastName})`} into a Partner?</div>}
            name="isPartner"
          >
            <Switch 
              checkedChildren='Yes'
              unCheckedChildren='No'
            /> 
          </Form.Item>
          <Form.Item
            label={<div className="partnerForm__whiteText">Role(s)</div>}
            name="roles"
          >
            <Select
              mode="multiple"
              allowClear
              options={[
                { value: "events", label: "Parties/events" },
                { value: "sales", label: "Tickets" },
                { value: "tickets", label: "Shop-listings" },
                { value: "analytics", label: "Data/analytics" },
              ]}
            />
            </Form.Item> */}
          <Form.Item>
            <div className="partnerForm__buttonContainer">
              <Button
                className="partnerForm__cancelButton"
                htmlType="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="partnerForm__submitButton"
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