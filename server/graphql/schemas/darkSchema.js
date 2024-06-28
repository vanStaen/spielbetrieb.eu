export const Dark = `
type Dark {
    id: ID! 
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
    getPublicDarks: [Dark]
    getDarks: [Dark]
`;

export const DarkMutations = `
    addDark(darkInput: DarkInputData!): Dark!
    updateDark(darkId: ID!, darkInput: DarkInputData!): Dark!
    deleteDark(darkId: ID!): Dark!
`;
