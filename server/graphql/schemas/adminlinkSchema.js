exports.Adminlink = `
type Adminlink {
    _id: ID! 
    shortDesc: String!
    category: String!
    link: String!
    archived: Boolean
    user: User
}`;

exports.AdminlinkInputData = `
input AdminlinkInputData {
    shortDesc: String
    category: String
    link: String
    archived: Boolean
}`;

exports.AdminlinkQueries = `
    getAllAdminlinks: [Adminlink]
    `;

exports.AdminlinkMutations = `
    addAdminlink(adminlinkInput: AdminlinkInputData!): Adminlink!
    updateAdminlink(adminlinkId: ID!, adminlinkInput: AdminlinkInputData!): Adminlink!
    deleteAdminlink(adminlinkId: ID!): Boolean!
`;
