export const Chat = `
type Chat {
    _id: ID! 
    userlist: [Int]!
    archived: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const ChatInputData = `
input ChatInputData {
    userlist: [Int]!
}`;

export const ChatQueries = `
    getChats(userId: Int): [Chat]!
`;

export const ChatMutations = `
    createChat(chatInput: ChatInputData!): Chat!
    archiveChat(chatId: ID!): Chat!
`;
