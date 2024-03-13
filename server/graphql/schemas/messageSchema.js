export const Message = `
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

export const MessageInputData = `
input MessageInputData {
    message: String!
    attachedPhotoUrl: String
}`;

export const MessageQueries = `
    getMessages(chatId: Int): [Message]
`;

export const MessageMutations = `
    addMessage(chatId: ID!, messageInput: MessageInputData!): Message!
    deleteMessage(messageId: ID!): Boolean!
`;
