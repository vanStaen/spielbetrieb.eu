export const Partner = `
type Partner {
    id: ID! 
    userName: String
    name: String!
    description: String
    avatar: String
    pictures: [String]
    settings: String
    reviews: [String]
    partnertype: Int
    partnerRoles: [Int]
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
    userName: String
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
    userName: String
    name: String
    description: String
    avatar: String
    pictures: [String]
    settings: String
    reviews: [String]
    partnertype: Int
    partnerRoles: [Int]
    links: [String]
    partnerTags: [Int]
    archived: Boolean
    suspended: Boolean
    admin: [Int]
}`;

export const PartnerQueries = `
    getPartnerById(partnerId: Int): Partner
    getPartnerByUserName(partnerUserName: String): Partner
    getAllPartners: [Partner]
    `;

export const PartnerMutations = `
    addPartner(partnerInput: PartnerInputData!): Partner!
    updatePartner(partnerId: ID!, partnerInput: PartnerInputData!): Partner!
    updatePartnerAsAdmin(partnerId: ID!, partnerInput: PartnerInputDataAdmin!): Partner!
    updatePendingPartner(partnerId: ID!): Partner!
    archivePartner(partnerId: ID!, archived: Boolean): Boolean!
    deletePartnerAsAdmin(partnerId: ID!): Boolean!
`;
