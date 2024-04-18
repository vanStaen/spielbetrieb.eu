import { eventFormStore } from "../../eventFormStore.js";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent.js";

export function publishEvent() {
    if (eventFormStore.eventId) {
        updateEvent(eventFormStore.eventId, {
            isDraft: false,
        });
        // Add new locations
        if (eventFormStore.isNewLocation) {
            console.log('newLocation', location.name, location.address, location.coordinates)
        }
        // Route to event page
        document.location.href = `/event/${eventFormStore.eventId}`;
    } else {
        console.log('ERROR: You should not be here if you dont have an event id!')
    }
};