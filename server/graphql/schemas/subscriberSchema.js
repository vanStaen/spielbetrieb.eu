export const Subscriber = `
type Subscriber {
    id: ID! 
    username: String
    email: String!
    about: String
    language: String!
    interests: [String]
    lists: [String]!
    verifiedEmail: Boolean!
    createdAt: Float!
    updatedAt: Float!
}`;

export const SubscriberInputData = `
input SubscriberInputData {
    username: String
    email: String
    about: String
    language: String
    interests: [String]
    lists: [String]
}`;

export const SubscriberQueries = `
    getSubscribers: [Subscriber]
`;

export const SubscriberMutations = `
    addSubscriber(subscriberInput: SubscriberInputData!): Subscriber!
    updateSubscriber(subscriberId: ID!, subscriberInput: SubscriberInputData!): Subscriber!
    deleteSubscriber(subscriberId: ID!): Boolean!
`;
