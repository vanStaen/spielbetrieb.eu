export const Eventtype = `
type Eventtype {
    id: ID! 
    name: String!
    usage: String!
    validated: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const EventtypeInputData = `
input EventtypeInputData {
    name: String
    usage: String
    validated: Boolean
}`;

export const EventtypeQueries = `
    getAllEventtypes: [Eventtype]
    `;

export const EventtypeMutations = `
    addEventtype(eventtypeInput: EventtypeInputData!): Eventtype!
    updateEventtype(eventtypeId: ID!, eventtypeInput: EventtypeInputData!): Eventtype!
    deleteEventtype(eventtypeId: ID!): Boolean!
`;
