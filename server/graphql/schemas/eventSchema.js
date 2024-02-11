exports.Event = `
type Event {
    _id: ID! 
    eventtype: Int!
    title: String!
    description: String
    pictures: [String]
    location: Int
    locationName: String
    locationAddress: String
    locationCoordinates: String
    fromDate: Float
    untilDate: Float
    eventTags: [Int]
    attendees: [Int]
    invited: [Int]
    admin: [Int]
    private: Boolean!
    forwardable: Boolean!
    allowAnonymous: Boolean!
    isDraft: Boolean!
    createdAt: Float!
    updatedAt: Float!
    user: User
}`;

exports.EventInputData = `
input EventInputData {
    eventtype: Int
    title: String
    description: String
    pictures: [String]
    location: Int
    locationName: String
    locationAddress: String
    locationCoordinates: String
    fromDate: Float
    untilDate: Float
    eventTags: [Int]
    attendees: [Int]
    invited: [Int]
    admin: [Int]
    private: Boolean
    forwardable: Boolean
    allowAnonymous: Boolean
    isDraft: Boolean
}`;

exports.EventQueries = `
    getEvent(eventId: Int): Event
    getAllEvents: [Event]
    getAllPublicEvents: [Event]
    `;

exports.EventMutations = `
    addEvent(eventInput: EventInputData!): Event!
    updateEvent(eventId: ID!, eventInput: EventInputData!): Event!
    deleteEvent(eventId: ID!): Boolean!
`;
