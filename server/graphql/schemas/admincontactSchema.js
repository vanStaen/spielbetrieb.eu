exports.Admincontact = `
type Admincontact {
    _id: ID! 
    name: String!
    email: String!
    details: String
    archived: Boolean
    user: User
}`;

exports.AdmincontactInputData = `
input AdmincontactInputData {
    name: String
    email: String
    details: String
    archived: Boolean
}`;

exports.AdmincontactQueries = `
    getAllAdmincontacts: [Admincontact]
    `;

exports.AdmincontactMutations = `
    addAdmincontact(admincontactInput: AdmincontactInputData!): Admincontact!
    updateAdmincontact(admincontactId: ID!, admincontactInput: AdmincontactInputData!): Admincontact!
    deleteAdmincontact(admincontactId: ID!): Boolean!
`;
