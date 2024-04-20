export const Translation = `
type Translation {
    _id: ID! 
    category: String!
    key: String!
    text: String!
    language: String!
}`;

export const TranslationInputData = `
input TranslationInputData {
    category: String
    key: String
    text: String!
    language: String
}`;

export const TranslationQueries = `
    getTranslations: [Translation]
    `;

export const TranslationMutations = `
    addTranslation(translationInput: TranslationInputData!): Translation!
    updateTranslation(translationId: ID!, translationInput: TranslationInputData!): Translation!
    deleteTranslation(translationId: ID!): Boolean!
`;
