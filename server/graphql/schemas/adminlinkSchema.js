exports.Adminlinktype = `
type Adminlinktype {
    _id: ID! 
    shortDesc: String!
    category: String!
    link: String!
    archived: Boolean
}`;
n 
exports.AdminlinktypeInputData = `
input AdminlinktypeInputData {
    shortDesc: String
    category: String
    link: String
    archived: Boolean
}`;

exports.AdminlinktypeQueries = `
    getAdminlinktypes: [Adminlinktype]
    `;

exports.AdminlinktypeMutations = `
    addAdminlinktype(adminlinktypeInput: AdminlinktypeInputData!): Adminlinktype!
    updateAdminlinktype(adminlinktypeId: ID!, adminlinktypeInput: AdminlinktypeInputData!): Adminlinktype!
    deleteAdminlinktype(adminlinktypeId: ID!): Boolean!
`;
