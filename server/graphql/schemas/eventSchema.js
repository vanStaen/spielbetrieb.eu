export const Event = `
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
    links: [String]
    admin: [Int]
    private: Boolean!
    forwardable: Boolean!
    allowAnonymous: Boolean!
    isDraft: Boolean!
    isPartnerEvent: Boolean!
    createdAt: Float!
    updatedAt: Float!
    user: User
}`;

export const EventInputData = `
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
    links: [String]
    admin: [Int]
    private: Boolean
    forwardable: Boolean
    allowAnonymous: Boolean
    isDraft: Boolean
    isPartnerEvent: Boolean
}`;

export const EventQueries = `
    getEvent(eventId: Int): Event
    getAllEvents: [Event]
    getAllPublicEvents(fromDate: Float!, untilDate: Float!, locations: [Int], eventtypes: [Int], tags: [Int]): [Event]
    `;

export const EventMutations = `
    addEvent(eventInput: EventInputData!): Event!
    updateEvent(eventId: ID!, eventInput: EventInputData!): Event!
    deleteEvent(eventId: ID!): Boolean!
`;
