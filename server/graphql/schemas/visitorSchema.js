export const Visitor = `
type Visitor {
    id: ID! 
    userId: Int!
    visitedId: Int!
    visitorId: Int!
    user: User
    createdAt: Float!
    udpatedAt: Float!
}`;

export const VisitorQueries = `
    getVisitor: [Visitor]
`;

export const VisitorMutations = `
    addVisitor(visitedId: Int!): Visitor!
`;
