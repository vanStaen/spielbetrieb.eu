export const Admincontact = `
type Admincontact {
    id: ID! 
    name: String!
    email: String!
    details: String
    archived: Boolean
    user: User
    createdAt: Float!
    updatedAt: Float!
}`;

export const AdmincontactInputData = `
input AdmincontactInputData {
    name: String
    email: String
    details: String
    archived: Boolean
}`;

export const AdmincontactQueries = `
    getAllAdmincontacts: [Admincontact]
    `;

export const AdmincontactMutations = `
    addAdmincontact(admincontactInput: AdmincontactInputData!): Admincontact!
    updateAdmincontact(admincontactId: ID!, admincontactInput: AdmincontactInputData!): Admincontact!
    deleteAdmincontact(admincontactId: ID!): Boolean!
`;
