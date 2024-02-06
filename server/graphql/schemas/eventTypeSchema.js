exports.EventType = `
type EventType {
    _id: ID! 
    name: String!
    validated: Boolean
}`;

exports.EventTypeInputData = `
input EventTypeInputData {
    name: String
    validated: Boolean
}`;

exports.EventTypeQueries = `
    getEventTypes: [EventType]
    `;

exports.EventTypeMutations = `
    addEventType(eventTypeInput: EventTypeInputData!): EventType!
    updateEventType(eventTypeId: ID!, eventTypeInput: EventTypeInputData!): EventType!
    deleteEventType(eventTypeId: ID!): Boolean!
`;
