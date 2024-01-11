exports.Chat = `
type Chat {
    _id: ID! 
    userlist: [Int]!
    archived: Boolean
    createdAt: String!
    updatedAt: String!
}`;

exports.ChatInputData = `
input ChatInputData {
    userlist: [Int]!
}`;

exports.ChatQueries = `
    getChats(userId: Int): [Chat]!
`;

exports.ChatMutations = `
    createChat(chatInput: ChatInputData!): Chat!
    archiveChat(chatId: ID!): Chat!
`;
