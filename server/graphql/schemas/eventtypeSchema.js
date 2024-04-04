export const Eventtype = `
type Eventtype {
    _id: ID! 
    name: String!
    usage: Int!
    validated: Boolean
}`;

export const EventtypeInputData = `
input EventtypeInputData {
    name: String
    usage: Int
    validated: Boolean
}`;

export const EventtypeQueries = `
    getEventtypes(usage: Int!): [Eventtype]
    getAllEventtypes: [Eventtype]
    `;

export const EventtypeMutations = `
    addEventtype(eventtypeInput: EventtypeInputData!): Eventtype!
    updateEventtype(eventtypeId: ID!, eventtypeInput: EventtypeInputData!): Eventtype!
    deleteEventtype(eventtypeId: ID!): Boolean!
`;
