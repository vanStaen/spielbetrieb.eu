exports.Dark = `
type Dark {
    _id: ID! 
    number: Int!
    title: String!
    description: String!
    pictures: [String]
    link: String
    tags: [Int]
    archived: Boolean!
    createdAt: String!
    updatedAt: String!
}`;

exports.DarkInputData = `
input DarkInputData {
    number: Int
    title: String
    description: String
    pictures: [String]
    link: String
    tags: [Int]
    archived: Boolean
}`;

exports.DarkQueries = `
    getDarks(userId: Int): [Dark]!
`;

exports.DarkMutations = `
    addDark(darkInput: DarkInputData!): Dark!
    editDark(darkId: ID!, darkInput: DarkInputData!): Dark!
    archiveDark(darkId: ID!): Dark!
`;
