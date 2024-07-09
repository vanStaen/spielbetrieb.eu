export const Partner = `
type Partner {
    id: ID! 
    name: String!
    description: String
    avatar: String
    pictures: [String]
    settings: String
    reviews: [String]
    partnertype: Int
    partnerRoles: Int
    links: [String]
    partnerTags: [Int]
    archived: Boolean
    suspended: Boolean
    admin: [Int]
    pending: Boolean
    createdAt: Float!
    updatedAt: Float!
    lastActive: Float!
}`;

export const PartnerInputData = `
input PartnerInputData {
    name: String
    description: String
    avatar: String
    pictures: [String]
    settings: String
    reviews: [String]
    partnertype: Int
    links: [String]
    partnerTags: [Int]
    archived: Boolean
    admin: [Int]
}`;

export const PartnerInputDataAdmin = `
input PartnerInputDataAdmin {
    name: String
    description: String
    avatar: String
    pictures: [String]
    settings: String
    reviews: [String]
    partnertype: Int
    partnerRoles: Int
    links: [String]
    partnerTags: [Int]
    archived: Boolean
    suspended: Boolean
    pending: Boolean
    admin: [Int]
}`;

export const PartnerQueries = `
    getPartner(partnerId: Int): Partner
    getAllPartners: [Partner]
    `;

export const PartnerMutations = `
    addPartner(partnerInput: PartnerInputData!): Partner!
    updatePartner(partnerId: ID!, partnerInput: PartnerInputData!): Partner!
    updatePartnerAsAdmin(partnerId: ID!, partnerInput: PartnerInputDataAdmin!): Partner!
    deletePartnerAsAdmin(partnerId: ID!): Boolean!
`;
