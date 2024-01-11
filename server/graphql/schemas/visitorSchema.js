exports.Visitor = `
type Visitor {
    _id: ID! 
    userId: Int!
    visitedId: Int!
    visitorId: Int!
    user: User
    createdAt: String!
    udpatedAt: String!
}`;

exports.VisitorQueries = `
    getVisitor: [Visitor]
`;

exports.VisitorMutations = `
    addVisitor(visitedId: Int!): Visitor!
`;
