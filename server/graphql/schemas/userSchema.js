exports.User = `
type User {
    _id: ID! 
    isAdmin: Boolean!
    adminRoles: [String]
    isPartner: Boolean!
    partnerRoles: [String]
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    description: String
    avatar: String
    emailSettings: String
    profilSettings: String
    verifiedEmail: Boolean!
    verifiedIdentity: Boolean!
    birthday: String
    gender: String
    orientation: String
    wishes: [String]
    interests: [String]
    archived: Boolean
    usernameChange: Int
    lastActive: String!
    createdAt: String!
    updatedAt: String!
    comments: [Comment]
    events: [Event]
    messages: [Message]
    notifications: [Notification]
    photos: [Photo]
    visitors: [Visitor] 
    friends: [User]
    followers: [User]
    followed: [User]
}`;

exports.UserInputData = `
input UserInputData {
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    description: String
    avatar: String
    emailSettings: String
    profilSettings: String
    birthday: String
    gender: String
    orientation: String
    wishes: [String]
    interests: [String]
    archived: Boolean
    usernameChange: Int
}`;

exports.UserQueries = `
    getUser: User
    getFriends: [User]
    getFollowers: [User]
    getFollowed: [User]
    getProfileByName(userName: String): User
    getProfileById(_id: ID!): User
`;

exports.UserMutations = `
    addUser(userInput: UserInputData!): User!
    updateUser(userInput: UserInputData!): User!
    deleteUser: Boolean!
`;
