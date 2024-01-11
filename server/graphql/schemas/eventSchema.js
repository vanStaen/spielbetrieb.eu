exports.Event = `
type Event {
    _id: ID! 
    eventType: String!
    title: String!
    description: String
    picture: String
    location: String
    fromDate: String
    untilDate: String
    attendees: [Int]
    invited: [Int]
    admin: [Int]
    private: Boolean!
    forwardable: Boolean!
    allowAnonymous: Boolean!
    createdAt: String!
    updatedAt: String!
    user: User
}`;

exports.EventInputData = `
input EventInputData {
    eventType: String
    title: String
    description: String
    picture: String
    location: String
    fromDate: String
    untilDate: String
    attendees: [Int]
    invited: [Int]
    admin: [Int]
    private: Boolean
    forwardable: Boolean
    allowAnonymous: Boolean
}`;

exports.EventQueries = `
    getEvent(eventId: Int): Event
    getAllEvents: [Event]
    `;

exports.EventMutations = `
    addEvent(eventInput: EventInputData!): Event!
    updateEvent(eventId: ID!, eventInput: EventInputData!): Event!
    deleteEvent(eventId: ID!): Boolean!
`;
