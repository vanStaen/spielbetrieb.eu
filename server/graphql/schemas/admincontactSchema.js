exports.Admincontacttype = `
type Admincontacttype {
    _id: ID! 
    name: String!
    email: String!
    details: String
    archived: Boolean
}`;

exports.AdmincontacttypeInputData = `
input AdmincontacttypeInputData {
    name: String
    email: String
    details: String
    archived: Boolean
}`;

exports.AdmincontacttypeQueries = `
    getAdmincontacttypes: [Admincontacttype]
    `;

exports.AdmincontacttypeMutations = `
    addAdmincontacttype(admincontacttypeInput: AdmincontacttypeInputData!): Admincontacttype!
    updateAdmincontacttype(admincontacttypeId: ID!, admincontacttypeInput: AdmincontacttypeInputData!): Admincontacttype!
    deleteAdmincontacttype(admincontacttypeId: ID!): Boolean!
`;
