export const Dark = `
type Dark {
    _id: ID! 
    number: Int!
    title: String!
    description: String!
    pictures: [String]
    link: String
    tags: [Int]
    archived: Boolean!
    createdAt: Float!
    updatedAt: Float!
}`;

export const DarkInputData = `
input DarkInputData {
    number: Int
    title: String
    description: String
    pictures: [String]
    link: String
    tags: [Int]
    archived: Boolean
}`;

export const DarkQueries = `
    getDark(darkId: Int): Dark!
    getDarks: [Dark]
`;

export const DarkMutations = `
    addDark(darkInput: DarkInputData!): Dark!
    editDark(darkId: ID!, darkInput: DarkInputData!): Dark!
    archiveDark(darkId: ID!): Dark!
`;
