import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { getAllPublicEvents } from './getAllPublicEvents'; 
import { CustomSpinner } from '../../../components/CustomSpinner/CustomSpinnner';

import './Agenda.less';

export const Agenda = observer(() => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEvents = async () => {
        const events = await getAllPublicEvents();   
        console.log("events", events);     
        setEvents(events);
        setIsLoading(false);
      };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (<>
        { isLoading ?
            <CustomSpinner text="Loading" />
            :
        <div className='agenda__container'>
            <div className='agenda__eventContainer color1'>{events[0]?.title}</div>
            <div className='agenda__eventContainer color2'>{events[1]?.title}</div>
            <div className='agenda__eventContainer color3'>{events[2 ]?.title}</div>
            <div className='agenda__eventContainer color4'>{events[0]?.title}</div>
            <div className='agenda__eventContainer color5'>{events[1]?.title}</div>
            <div className='agenda__eventContainer color6'>{events[2 ]?.title}</div>
        </div>
        }
    </>)
})