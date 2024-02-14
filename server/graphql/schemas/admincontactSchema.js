exports.Admincontact = `
type Admincontact {
    _id: ID! 
    name: String!
    email: String!
    details: String
    archived: Boolean
}`;

exports.AdmincontactInputData = `
input AdmincontactInputData {
    name: String
    email: String
    details: String
    archived: Boolean
}`;

exports.AdmincontactQueries = `
    getAdmincontact: [Admincontact]
    `;

exports.AdmincontactMutations = `
    addAdmincontact(admincontactInput: AdmincontactInputData!): Admincontact!
    updateAdmincontact(admincontactId: ID!, admincontactInput: AdmincontactInputData!): Admincontact!
    deleteAdmincontact(admincontactId: ID!): Boolean!
`;
