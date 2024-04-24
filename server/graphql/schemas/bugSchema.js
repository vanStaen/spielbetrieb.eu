export const Bug = `
type Bug {
    _id: ID! 
    userId: Int!
    user: User
    category: Int!
    desc: String!
    screenshot: String
    isUrgent: Boolean
    isResolved: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const BugInputData = `
input BugInputData {
    category: Int
    desc: String
    screenshot: String
    isUrgent: Boolean
    isResolved: Boolean
    createdAt: Float
    updatedAt: Float
}`;

export const BugQueries = `
    getBugs: [Bug]
    `;

export const BugMutations = `
    addBug(bugInput: BugInputData!): Bug!
    updateBug(bugId: ID!, bugInput: BugInputData!): Bug!
    deleteBug(bugId: ID!): Boolean!
`;
