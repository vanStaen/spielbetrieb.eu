export const Partner = `
type Partner {
    id: ID! 
    name: String!
    description: String
    avatar: String
    pictures: [String]
    profilSettings: String
    reviews: [String]
    partnertype: Int
    partnerRoles: Int
    lastActive: Float!
    archived: Boolean
    suspended: Boolean
    admin: [Int]
    createdAt: Float!
    updatedAt: Float!
}`;

export const PartnerInputData = `
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
    admin: [Int]
}`;

export const PartnerQueries = `
    getPartner(partnerId: Int): Partner
    getAllPartners: [Partner]
    `;

export const PartnerMutations = `
    addPartner(partnerInput: PartnerInputData!): Partner!
    updatePartner(partnerId: ID!, partnerInput: PartnerInputData!): Partner!
    updatePartnerAsAdmin(partnerId: ID!, partnerInput: PartnerInputData!): Partner!
    deletePartnerAsAdmin(partnerId: ID!): Boolean!
`;

//TODO: Creat partner resolver