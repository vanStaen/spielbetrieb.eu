export const Translation = `
type Translation {
    id: ID! 
    category: String!
    key: String!
    en: String
    de: String
    fr: String
    es: String
    ru: String
    createdAt: Float!
    updatedAt: Float!
}`;

export const TranslationInputData = `
input TranslationInputData {
    category: String
    key: String
    en: String
    de: String
    fr: String
    es: String
    ru: String
}`;

export const TranslationQueries = `
    getTranslations: [Translation]
    `;

export const TranslationMutations = `
    addTranslation(translationInput: TranslationInputData!): Translation!
    updateTranslation(translationId: ID!, translationInput: TranslationInputData!): Translation!
    deleteTranslation(translationId: ID!): Boolean!
`;
