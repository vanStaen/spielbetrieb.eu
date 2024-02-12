import React from "react";
import { Tag } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import * as dayjs from 'dayjs';

import "./Event.less";
import "./EventColors.less";

export const Event = (props) => {
    const { event, color, tags } = props;

    console.log('event', event);
    /* TODO:
        Mark event
        Action on Tag click
        Get Ticket
    */

    const tagsFormatted = tags.map((tag) => {
        return (
          <Tag key={tag} bordered={false}>  
            #{tag}
          </Tag>
        );
      });

    return (            
        <div className={`event__Container ${"color" + color}`}>
            <div className='event__date'>
                <div className='event__dateYear'>
                    {dayjs(event.fromDate).format('YYYY')}
                </div>
                <div className='event__dateDayOfWeek'>
                    {dayjs(event.fromDate).format('ddd')}
                </div>
                <div className='event__dateDay'>
                    {dayjs(event.fromDate).format('DD')}
                </div>
                <div className='event__dateMonth'>
                    {dayjs(event.fromDate).format('MMM')}
                </div>
            </div>
            <div className='event__main'>
                <div className='event__titleLocation'>
                    <div className='event__location'>
                        {event.locationName}{" "} 
                        <span className="event__eventType">Rave{event.eventtype}</span>
                    </div>
                    <div className='event__title'>
                        {event.title}
                    </div>
                </div>
                <div className='event__timelocation'>
                    <ClockCircleOutlined />{" "}
                    {dayjs(event.fromDate).format('HH:mm')} -{" "}
                    {dayjs(event.untilDate).format('HH:mm')} 
                </div>
                <div className='event__timelocation'>
                    <EnvironmentOutlined />{" "} 
                    {event.locationAddress}
                </div>
                <div className='event__promoter'>
                    <span className='event__organizedBy'>Event organised by</span> 
                    {event.user.userName}
                </div>
                <div className='event__tags'>
                    {tagsFormatted}
                </div>
            </div>
            
        </div>
    )
}