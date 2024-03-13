export const Adminlink = `
type Adminlink {
    _id: ID! 
    shortDesc: String!
    category: String!
    link: String!
    archived: Boolean
    user: User
}`;

export const AdminlinkInputData = `
input AdminlinkInputData {
    shortDesc: String
    category: String
    link: String
    archived: Boolean
}`;

export const AdminlinkQueries = `
    getAllAdminlinks: [Adminlink]
    `;

export const AdminlinkMutations = `
    addAdminlink(adminlinkInput: AdminlinkInputData!): Adminlink!
    updateAdminlink(adminlinkId: ID!, adminlinkInput: AdminlinkInputData!): Adminlink!
    deleteAdminlink(adminlinkId: ID!): Boolean!
`;
