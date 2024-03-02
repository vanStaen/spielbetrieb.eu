exports.Partner = `
type Partner {
    _id: ID! 
    name: String!
    description: String
    avatar: String
    pictures: [String]
    profilSettings: String
    reviews: [String]
    partnertype: Int
    partnerRoles: Int
    lastActive: Float!
    createdAt: Float!
    updatedAt: Float!
    archived: Boolean
    suspended: Boolean
    user: User
}`;

exports.PartnerInputData = `
input PartnerInputData {
    name: String
    description: String
    avatar: String
    pictures: [String]
    profilSettings: String
    reviews: [String]
    partnertype: Int
    partnerRoles: Int
    archived: Boolean
    suspended: Boolean
}`;

exports.PartnerQueries = `
    getPartner(partnerId: Int): Partner
    getAllPartners: [Partner]
    `;

exports.PartnerMutations = `
    addPartner(partnerInput: PartnerInputData!): Partner!
    updatePartner(partnerId: ID!, partnerInput: PartnerInputData!): Partner!
    updatePartnerAsAdmin(partnerId: ID!, partnerInput: PartnerInputData!): Partner!
    deletePartnerAsAdmin(partnerId: ID!): Boolean!
`;
