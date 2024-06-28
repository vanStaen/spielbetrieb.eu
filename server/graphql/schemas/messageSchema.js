export const Message = `
type Message {
    id: ID! 
    userId: Int!
    chatId: Int!
    message: String!
    attachedPhotoUrl: String!
    chat: Chat,
    user: User,
    createdAt: Float!
    updatedAt: Float!
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
