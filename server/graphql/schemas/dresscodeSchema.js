export const Dresscode = `
type Dresscode {
    id: ID! 
    name: String!
    media: String
    validated: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const DresscodeInputData = `
input DresscodeInputData {
    name: String
    media: String
    validated: Boolean
}`;

export const DresscodeQueries = `
    getDresscodes: [Dresscode]
    `;

export const DresscodeMutations = `
    addDresscode(dresscodeInput: DresscodeInputData!): Dresscode!
    updateDresscode(dresscodeId: ID!, dresscodeInput: DresscodeInputData!): Dresscode!
    deleteDresscode(dresscodeId: ID!): Boolean!
`;
