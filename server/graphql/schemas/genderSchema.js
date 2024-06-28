export const Gender = `
type Gender {
    id: ID! 
    name: String!
    validated: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const GenderInputData = `
input GenderInputData {
    name: String
    validated: Boolean
}`;

export const GenderQueries = `
    getGenders: [Gender]
    `;

export const GenderMutations = `
    addGender(genderInput: GenderInputData!): Gender!
    updateGender(genderId: ID!, genderInput: GenderInputData!): Gender!
    deleteGender(genderId: ID!): Boolean!
`;
