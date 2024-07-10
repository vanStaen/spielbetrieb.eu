export const User = `
type User {
    id: ID! 
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
    getProfileById(id: ID!): User
    getProfileEventsById(id: ID!): [Event] 
    getProfilePartnersById(id: ID!): [Partner]
    isRequested(requesting_id: ID!): Boolean!
`;

export const UserMutations = `
    addUser(userInput: UserInputData!): User!
    addFollow(followed_id: ID!): Boolean!
    addFriendRequest(requested_id: ID!): Boolean!
    acceptFriendRequest(requesting_id: ID!): Boolean!
    declineFriendRequest(requesting_id: ID!): Boolean!
    updateUser(userInput: UserInputData!): User!
    updateUserAsAdmin(userId: ID!, userInput: UserInputDataAdmin!): User!
    deleteUserAsAdmin(userId: ID!): Boolean!
    deleteFollow(followed_id: ID!): Boolean!
    deleteFriendRequest(requested_id: ID!): Boolean!
    deleteFriendship(friend_id: ID!): Boolean!
`;
