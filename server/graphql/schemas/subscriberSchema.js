exports.Subscriber = `
type Subscriber {
    _id: ID! 
    name: String!
    email: String!
    about: String
    language: String
    interests: [String]
    lists: [String]!
    verifiedEmail: Boolean!
}`;

exports.SubscriberInputData = `
input SubscriberInputData {
    name: String
    email: String
    about: String
    language: String
    interests: [String]
    lists: [String]
}`;

exports.SubscriberQueries = `
    getSubscribers: [Subscriber]
`;

exports.SubscriberMutations = `
    addSubscriber(subscriberInput: SubscriberInputData!): Subscriber!
    updateSubscriber(subscriberId: ID!, subscriberInput: SubscriberInputData!): Subscriber!
    deleteSubscriber(subscriberId: ID!): Boolean!
`;
