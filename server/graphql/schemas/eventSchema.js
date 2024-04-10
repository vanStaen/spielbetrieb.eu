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
    hasDresscode: Boolean
    dresscodeDoTags: [Int]
    dresscodeDontTags: [Int]
    prices: [String]
    lineUp: [Int]
    ageMin: Int
    currency: String
    attendees: [Int]
    invited: [Int]
    links: [String]
    admin: [Int]
    private: Boolean!
    forwardable: Boolean!
    allowAnonymous: Boolean!
    isDraft: Boolean!
    isPartnerEvent: Boolean!
    validated: Boolean!
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
    hasDresscode: Boolean
    dresscodeDoTags: [Int]
    dresscodeDontTags: [Int]
    prices: [String]
    lineUp: [Int]
    ageMin: Int
    currency: String
    attendees: [Int]
    invited: [Int]
    links: [String]
    admin: [Int]
    private: Boolean
    forwardable: Boolean
    allowAnonymous: Boolean
    isDraft: Boolean
    isPartnerEvent: Boolean
    validated: Boolean
}`;

export const EventQueries = `
    getEvent(eventId: Int): Event
    getAllEvents: [Event]
    getAllDraftEvents: [Event]
    getAllPublicEvents(fromDate: Float!, untilDate: Float!, locations: [Int], eventtypes: [Int], tags: [Int]): [Event]
    `;

export const EventMutations = `
    addEvent(eventInput: EventInputData!): Event!
    updateEvent(eventId: ID!, eventInput: EventInputData!): Event!
    deleteEvent(eventId: ID!): Boolean!
`;
