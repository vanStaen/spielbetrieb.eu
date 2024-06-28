import React, { useState, useEffect } from "react";
import { notification, Modal, Button, Form, Select, Switch } from "antd";

import { updateUserAsAdmin } from "../updateUserAsAdmin";
import { getPartnertypes } from "../../../../store/pageStore/getPartnertypes";
import { nameParser } from "../../../../helpers/dev/nameParser";
import { userStore } from "../../../../store/userStore/userStore";

import "./PartnerForm.less";

export const PartnerForm = (props) => {
  const { selectedPartner, setSelectedPartner, fetchAllUsers } = props;
  const [loading, setLoading] = useState(false);
  const [partnertypes, setPartnertypes] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    setSelectedPartner(null);
  };

  const fetchPartnertypes = async () => {
    const results = await getPartnertypes();
    const partnertypes = results.map((type) => {
      if (type.validated === false) {
        return null;
      }
      return {
        value: parseInt(type.id),
        label: nameParser(type.name, userStore.language.toLowerCase()),
      };
    });
    setPartnertypes(partnertypes);
  };

  useEffect(() => {
    fetchPartnertypes();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateUserAsAdmin(selectedPartner.id, {
        isPartner: values.isPartner,
        partnerRoles: values.isPartner ? values.roles : null,
        partnertype: values.isPartner ? values.partnertype : null,
      });
    } catch (e) {
      notification.error({
        message: `Error: ${e.toString()}`,
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
    setLoading(false);
    fetchAllUsers();
    setSelectedPartner(null);
  };

  return (
    <Modal
      open={selectedPartner}
      centered
      title="Update Partner & Partner roles"
      onOk={onFinish}
      onCancel={onCancel}
      footer={null}
    >
      <div style={{ marginTop: 15 }}></div>
      <Form
        form={form}
        layout="horizontal"
        size="small"
        onFinish={onFinish}
        name="partner-form"
        initialValues={{
          isPartner: selectedPartner.isPartner,
          roles: selectedPartner.partnerRoles,
          partnertype: selectedPartner.partnertype,
        }}
      >
        <Form.Item
          label={
            <div className="partnerForm__whiteText">
              Make{" "}
              {`${selectedPartner.userName} (${selectedPartner.firstName} ${selectedPartner.lastName})`}{" "}
              into a Partner?
            </div>
          }
          name="isPartner"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
        <Form.Item
          label={<div className="partnerForm__whiteText">Partner Type</div>}
          name="partnertype"
        >
          <Select options={partnertypes} />
        </Form.Item>
        <Form.Item
          label={<div className="partnerForm__whiteText">Role(s)</div>}
          name="roles"
        >
          <Select
            mode="multiple"
            allowClear
            options={[
              { value: "events", label: "Parties/Events" },
              { value: "sales", label: "Tickets-listings" },
              { value: "tickets", label: "Shop-listings" },
              { value: "analytics", label: "Data/Analytics" },
            ]}
          />
        </Form.Item>
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
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
