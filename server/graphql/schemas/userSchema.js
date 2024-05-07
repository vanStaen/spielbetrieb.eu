export const User = `
type User {
    _id: ID! 
    isAdmin: Boolean!
    adminRoles: [String]
    isPartner: Boolean!
    partnerRoles: [String]
    partnertype: Int
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
    birthday: Float
    gender: String
    orientation: String
    wishes: [String]
    interests: [String]
    archived: Boolean
    usernameChange: Int
    lastActive: String!
    comments: [Comment]
    events: [Event]
    messages: [Message]
    notifications: [Notification]
    photos: [Photo]
    visitors: [Visitor] 
    friends: [User]
    followers: [User]
    following: [User]
    language: String!
    deleted: Boolean!
    suspended: Boolean!
    createdAt: Float!
    updatedAt: Float!
}`;

export const UserInputData = `
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
    birthday: Float
    gender: String
    orientation: String
    wishes: [String]
    interests: [String]
    archived: Boolean
    usernameChange: Int
    language: String
}`;

export const UserInputDataAdmin = `
input UserInputDataAdmin {
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    description: String
    avatar: String
    emailSettings: String
    profilSettings: String
    birthday: Float
    gender: String
    orientation: String
    wishes: [String]
    interests: [String]
    archived: Boolean
    usernameChange: Int
    language: String
    suspended: Boolean
    isPartner: Boolean
    partnerRoles: [String]
    partnertype: Int
    verifiedIdentity: Boolean
}`;

export const UserQueries = `
    getUser: User
    getUsersAsAdmin: [User]
    getFriends: [User]
    getFollowers: [User]
    getFollowed: [User]
    getProfileByName(userName: String): User
    getProfileById(_id: ID!): User
`;

export const UserMutations = `
    addUser(userInput: UserInputData!): User!
    updateUser(userInput: UserInputData!): User!
    updateUserAsAdmin(userId: ID!, userInput: UserInputDataAdmin!): User!
    deleteUserAsAdmin(userId: ID!): Boolean!
`;
