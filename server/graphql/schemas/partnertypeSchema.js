exports.Partnertype = `
type Partnertype {
    _id: ID! 
    name: String!
}`;

exports.PartnertypeInputData = `
input PartnertypeInputData {
    name: String
}`;

exports.PartnertypeQueries = `
    getPartnertypes: [Partnertype]
    `;

exports.PartnertypeMutations = `
    addPartnertype(partnertypeInput: PartnertypeInputData!): Partnertype!
    updatePartnertype(partnertypeId: ID!, partnertypeInput: PartnertypeInputData!): Partnertype!
    deletePartnertype(partnertypeId: ID!): Boolean!
`;
