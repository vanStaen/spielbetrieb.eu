import React, { useRef, useState, useEffect } from "react";
import { observer } from "mobx-react";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import {
  notification,
  Button,
  Form,
  Select,
  Switch,
  Row,
  Col,
  Input,
  DatePicker,
  Tour,
  Steps,
} from "antd";

import errorLogo from "../../../../img/logos/errorLogo.png";
import { HelpButtons } from "../../../../components/HelpButtons/HelpButtons";
import { addEvent } from "./addEvent";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { getAllEventtypes } from "../../../../store/spielplanStore/getAllEventtypes";
import { eventFormStore } from "./eventFormStore";
import { authStore } from "../../../../store/authStore/authStore";
import { getLocations } from "../../../../store/spielplanStore/getLocations";
import { getTags } from "../../../../store/spielplanStore/getTags";
import { nameParser } from "../../../../helpers/nameParser";

import "./EventForm.less";
import { Link } from "react-router-dom";

export const EventForm = observer(() => {
  const [startTour, setStartTour] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [locationOptions, setLocationOptions] = useState(null);
  const [tags, setTags] = useState(null);
  const [eventtypes, setEventtypes] = useState(null);
  const [isNewLocation, setIsNewLocation] = useState(false);
  const [isPrivateEvent, setIsPrivateEvent] = useState(false);
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const isEdit = false;
  const language = pageStore.selectedLanguage?.toLowerCase();

  const onFinish = async () => {
    setLoading(true);
    const dataObject = await form.validateFields();
    dataObject.private = dataObject.isPrivate;
    dataObject.fromDate = dataObject.eventDate[0].valueOf();
    dataObject.untilDate = dataObject.eventDate[1].valueOf();
    if (dataObject.location) {
      const selectedLocation = locations.filter(
        (loc) => parseInt(loc._id) === dataObject.location,
      )[0];
      dataObject.locationName = selectedLocation.name;
      dataObject.locationAddress = selectedLocation.address;
      dataObject.locationCoordinates = selectedLocation.coordinates;
    }
    delete dataObject.isPrivate;
    delete dataObject.eventDate;
    try {
      if (isEdit) {
        await updateEvent(isEdit, dataObject);
      } else {
        await addEvent(dataObject);
      }
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
    reload();
  };

  /*
        TODO: 
        pictures: [String]
        locationCoordinates: String
        attendees: [Int]
        invited: [Int]
        admin: [Int]
      */

  const ref1 = useRef(null);
  const eventFormTourSteps = [
    {
      title: "Artworks of the event",
      description: "Please upload the artworks for your event here.",
      target: () => ref1.current,
    },
  ];

  return (
    <>
      {authStore.hasAccess ? (
        <div className="eventform__container" ref={ref1}>
          <Form
            form={form}
            layout="horizontal"
            size="small"
            onFinish={onFinish}
            name="event-form"
            className="eventform__admin"
          >
            <div style={{ marginTop: 15 }}></div>

            <Form.Item
              name="eventDate"
              rules={[
                {
                  required: true,
                  message: "Please input the event date!",
                },
              ]}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
                style={{ width: "100%" }}
                needConfirm={false}
                placeholder={["Event start-date", "Event end-date"]}
              />
            </Form.Item>
            <Form.Item name="eventTags">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select some tags"
                className="eventtype__select"
                options={tags}
              />
            </Form.Item>

            <Row>
              <Col span={9}>
                <Form.Item
                  label={
                    <div className="eventForm__whiteText">Allow anonym?</div>
                  }
                  name="allowAnonymous"
                >
                  <Switch checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={<div className="eventForm__whiteText">Private?</div>}
                  name="isPrivate"
                >
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    onChange={(value) => setIsPrivateEvent(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                {isPrivateEvent && (
                  <Form.Item
                    label={
                      <div className="eventForm__whiteText">Forwardable?</div>
                    }
                    name="forwardable"
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                  </Form.Item>
                )}
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
                  {isEdit ? "Update event" : "Create event"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div className="eventform__singupfirst">
          <img
            src={errorLogo}
            width="50px"
            className="eventform__singupfirstImg"
          />
          <div
            className={`eventform__singupfirstText ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
            onClick={() => {
              document.location.href = "/login";
            }}
          >
            <div>You need to be logged in!</div>
            <div>
              Click on the <UserOutlined /> - top right corner - to log in or
              sign up.
            </div>
          </div>
        </div>
      )}
      <HelpButtons setStartTour={setStartTour} />
      <Tour
        open={startTour}
        onClose={() => setStartTour(false)}
        steps={eventFormTourSteps}
      />
    </>
  );
});
