export const User = `
type User {
    _id: ID! 
    isAdmin: Boolean!
    adminRoles: [String]
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
    gender: Int
    orientation: Int
    location: String
    coordinates: String
    wishes: String
    interests: String
    links: [String]
    userTags: [Int]
    archived: Boolean
    usernameChange: Int
    lastActive: String!
    artists: [Artist]
    partners: [Partner]
    comments: [Comment]
    events: [Event]
    reviews: [Review]
    messages: [Message]
    notifications: [Notification]
    photos: [Photo]
    visitors: [Visitor] 
    friends: [User]
    friendrequests: [User]
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
    gender: Int
    orientation: Int
    location: String
    coordinates: String
    wishes: String
    interests: String
    links: [String]
    userTags: [Int]
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
    gender: Int
    orientation: Int
    location: String
    coordinates: String
    wishes: String
    interests: String
    links: [String]
    userTags: [Int]
    archived: Boolean
    usernameChange: Int
    language: String
    suspended: Boolean
    verifiedIdentity: Boolean
}`;

export const UserQueries = `
    getUser: User
    getUsersAsAdmin: [User]
    getProfileByName(userName: String): User
    getProfileById(_id: ID!): User
    isRequested(requestingId: ID!): Boolean!
`;

export const UserMutations = `
    addUser(userInput: UserInputData!): User!
    addFollow(followedId: ID!): Boolean!
    addFriendRequest(requestedId: ID!): Boolean!
    acceptFriendRequest(requestingId: ID!): Boolean!
    declineFriendRequest(requestingId: ID!): Boolean!
    updateUser(userInput: UserInputData!): User!
    updateUserAsAdmin(userId: ID!, userInput: UserInputDataAdmin!): User!
    deleteUserAsAdmin(userId: ID!): Boolean!
    deleteFollow(followedId: ID!): Boolean!
    deleteFriendRequest(requestedId: ID!): Boolean!
    deleteFriendship(friendId: ID!): Boolean!
`;
