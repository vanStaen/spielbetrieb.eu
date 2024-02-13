import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { getAllPublicEvents } from './getAllPublicEvents'; 
import { CustomSpinner } from '../../../components/CustomSpinner/CustomSpinnner';
import { getEventtypes } from '../../Admin/AdminData/AdminEventtypes/getEventtypes';
import { getTags } from '../../Admin/AdminData/AdminTags/getTags';
import { EventCard } from "./EventCard/EventCard";
import { nameParser } from '../../../helpers/nameParser';
import { pageStore } from '../../../store/pageStore/pageStore';
import { EventFilters } from './EventFilters/EventFilters';

import './Agenda.less';

export const Agenda = observer(() => {
    const [events, setEvents] = useState([]);
    const [tags, setTags] = useState([]);
    const [eventtypes, setEventtypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchEvents = async () => {
        const events = await getAllPublicEvents();  
        setEvents(events);
        setIsLoading(false);
      };

    const fetchEventtypes = async () => {
        const eventtypes = await getEventtypes();
        setEventtypes(eventtypes);
    };

    const fetchTags = async () => {
        const tags = await getTags();
        setTags(tags);
    };

    useEffect(() => {
        fetchEventtypes();
        fetchTags();
        fetchEvents();
    }, []);

    const eventsFormatted = events?.map(event => {
        const eventColor =  eventtypes.filter(et => parseInt(et._id) === event.eventtype)[0]?.color;
        const eventTags =  event.eventTags.map(tagId => {
            return nameParser(
                tags.filter(tag => parseInt(tag._id) ===  tagId)[0]?.name,
                pageStore.selectedLanguage?.toLowerCase()
                );     
        });        
        eventTags.splice(0, 0, 
            nameParser(
                eventtypes.filter(et => parseInt(et._id) ===  event.eventtype)[0]?.name,
                pageStore.selectedLanguage?.toLowerCase()
                )
            );
        return <EventCard event={event} color={eventColor} tags={eventTags}/>
    })

    return (<>
        { isLoading ?
            <div className='agenda__spinnerContainer'>
                <CustomSpinner text="Loading events" />
            </div>
            :
        <div className='agenda__container'>
            {/*
            TODO:
            search per text
            browse month/week/day
            filter per day
            filter per tag
            */}
            <EventFilters />
            {eventsFormatted}
        </div>
        }
    </>)
})