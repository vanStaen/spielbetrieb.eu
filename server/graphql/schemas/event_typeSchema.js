exports.Eventtype = `
type Eventtype {
    _id: ID! 
    name: String!
    validated: Boolean
}`;

exports.EventtypeInputData = `
input EventtypeInputData {
    name: String
    validated: Boolean
}`;

exports.EventtypeQueries = `
    getEventtypes: [Eventtype]
    `;

exports.EventtypeMutations = `
    addEventtype(eventtypeInput: EventtypeInputData!): Eventtype!
    updateEventtype(eventtypeId: ID!, eventtypeInput: EventtypeInputData!): Eventtype!
    deleteEventtype(eventtypeId: ID!): Boolean!
`;
