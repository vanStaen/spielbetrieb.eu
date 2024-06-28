export const Partnertype = `
type Partnertype {
    id: ID! 
    name: String!
    createdAt: Float!
    udpatedAt: Float!
}`;

export const PartnertypeInputData = `
input PartnertypeInputData {
    name: String
}`;

export const PartnertypeQueries = `
    getPartnertypes: [Partnertype]
    `;

export const PartnertypeMutations = `
    addPartnertype(partnertypeInput: PartnertypeInputData!): Partnertype!
    updatePartnertype(partnertypeId: ID!, partnertypeInput: PartnertypeInputData!): Partnertype!
    deletePartnertype(partnertypeId: ID!): Boolean!
`;
