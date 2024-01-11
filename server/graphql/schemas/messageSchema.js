exports.Message = `
type Message {
    _id: ID! 
    userId: Int!
    chatId: Int!
    message: String!
    attachedPhotoUrl: String!
    createdAt: String!
    updatedAt: String!
    chat: Chat,
    user: User,
}`;

exports.MessageInputData = `
input MessageInputData {
    message: String!
    attachedPhotoUrl: String
}`;

exports.MessageQueries = `
    getMessages(chatId: Int): [Message]
`;

exports.MessageMutations = `
    addMessage(chatId: ID!, messageInput: MessageInputData!): Message!
    deleteMessage(messageId: ID!): Boolean!
`;
