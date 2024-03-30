import React, { useRef, useState, useEffect } from 'react';
import dayjs from "dayjs";
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
  Tour
} from "antd";

import { HelpButtons } from "../../../../components/HelpButtons/HelpButtons";
import { addEvent } from "./addEvent";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { getEventtypes } from "../../../../store/spielplanStore/getEventtypes";
import { getLocations } from "../../../../store/spielplanStore/getLocations";
import { getTags } from "../../../../store/spielplanStore/getTags";
import { nameParser } from "../../../../helpers/nameParser";

import './EventForm.less';
import { observer } from 'mobx-react';

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

    const fetchEventtypes = async () => {
        const results = await getEventtypes();
        const eventtypes = results.map((type) => {
          if (type.validated === false) {
            return null;
          }
          return {
            value: parseInt(type._id),
            label: nameParser(type.name, language),
          };
        });
        setEventtypes(eventtypes);
      };
    
      const fetchLocations = async () => {
        const locations = await getLocations();
        const locationOptions = locations.map((location) => {
          if (location.validated === false) {
            return null;
          }
          return {
            value: parseInt(location._id),
            label: location.name,
          };
        });
        locationOptions.push({
          value: 0,
          label: <span style={{ opacity: ".5" }}>new location</span>,
        });
        setLocations(locations);
        setLocationOptions(locationOptions);
      };
    
      const fetchtags = async () => {
        const results = await getTags();
        const tags = results.map((tag) => {
          if (tag.validated === false || tag.eventTag === false) {
            return null;
          }
          return {
            value: parseInt(tag._id),
            label: nameParser(tag.name, language),
          };
        });
        setTags(tags);
    };

      
    useEffect(() => {
        fetchEventtypes();
        fetchLocations();
        fetchtags();
    }, [pageStore.selectedLanguage]);

    const onCancel = () => {
        form.resetFields();
        setShowEventForm(false);
      };

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
        title: 'Artworks of the event',
        description: 'Please upload the artworks for your event here.',
        target: () => ref1.current,
        }
    ]

    return (
        <>
            <div className='eventform__container' ref={ref1}>
            <Form
        form={form}
        layout="horizontal"
        size="small"
        onFinish={onFinish}
        name="event-form"
        className="eventform__admin"
        /* initialValues={
          data && {
            eventDate: [dayjs(data.fromDate), dayjs(data.untilDate)],
            ...data,
          }
        }*/
      >
        <div style={{ marginTop: 15 }}></div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="eventtype"
              rules={[
                {
                  required: true,
                  message: "Please select an event type!",
                },
              ]}
            >
              <Select
                options={eventtypes}
                placeholder="Event type"
                className="eventtype__select"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please select an event location!",
                },
              ]}
            >
              <Select
                options={locationOptions}
                onChange={(value) => setIsNewLocation(value === 0)}
                placeholder="Event location"
                className="eventtype__select"
              />
            </Form.Item>
          </Col>
        </Row>

        {isNewLocation && (
          <>
            <Form.Item name="locationName">
              <Input placeholder="Name of the Location" />
            </Form.Item>
            <Form.Item name="locationAddress">
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Location's address"
              />
            </Form.Item>
          </>
        )}
        <Form.Item name="title">
          <Input placeholder="Name of the event" />
        </Form.Item>
        <Form.Item name="description">
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder={"Description of the event"}
          />
        </Form.Item>
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
              label={<div className="eventForm__whiteText">Allow anonym?</div>}
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
                label={<div className="eventForm__whiteText">Forwardable?</div>}
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
            <HelpButtons setStartTour={setStartTour} />
            <Tour open={startTour} onClose={() => setStartTour(false)} steps={eventFormTourSteps} />
        </>
    ) ;
});