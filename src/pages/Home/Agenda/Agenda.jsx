import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { CustomSpinner } from '../../../components/CustomSpinner/CustomSpinnner';
import { EventCard } from "./EventCard/EventCard";
import { nameParser } from '../../../helpers/nameParser';
import { pageStore } from '../../../store/pageStore/pageStore';
import { EventFilters } from './EventFilters/EventFilters';

import './Agenda.less';

export const Agenda = observer(() => {
   
    useEffect(() => {
        pageStore.fetchEventtypes();
        pageStore.fetchLocations();
        pageStore.fetchTags();
        pageStore.fetchEvents();
    }, []);
    
    const eventsFormatted = pageStore.events?.map(event => {
        const eventColor =  pageStore.eventtypes.filter(et => parseInt(et._id) === event.eventtype)[0]?.color;
        const eventTags =  event.eventTags.map(tagId => {
            return nameParser(
                pageStore.tags.filter(tag => parseInt(tag._id) ===  tagId)[0]?.name,
                pageStore.selectedLanguage?.toLowerCase()
                );     
        });        
        eventTags.splice(0, 0, 
            nameParser(
                pageStore.eventtypes.filter(et => parseInt(et._id) ===  event.eventtype)[0]?.name,
                pageStore.selectedLanguage?.toLowerCase()
                )
            );
        return <EventCard event={event} color={eventColor} tags={eventTags}/>
    })

    return (<>
        { pageStore.isLoadingEvent ?
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