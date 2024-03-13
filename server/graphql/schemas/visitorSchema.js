export const Visitor = `
type Visitor {
    _id: ID! 
    userId: Int!
    visitedId: Int!
    visitorId: Int!
    user: User
    createdAt: String!
    udpatedAt: String!
}`;

export const VisitorQueries = `
    getVisitor: [Visitor]
`;

export const VisitorMutations = `
    addVisitor(visitedId: Int!): Visitor!
`;
