export const Tag = `
type Tag {
    id: ID! 
    name: String!
    isUserTag: Boolean
    isEventTag: Boolean
    isPictureTag: Boolean
    validated: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const TagInputData = `
input TagInputData {
    name: String
    isUserTag: Boolean
    isEventTag: Boolean
    isPictureTag: Boolean
    validated: Boolean
}`;

export const TagQueries = `
    getTags: [Tag]
    `;

export const TagMutations = `
    addTag(tagInput: TagInputData!): Tag!
    updateTag(tagId: ID!, tagInput: TagInputData!): Tag!
    deleteTag(tagId: ID!): Boolean!
`;
