exports.Tag = `
type Tag {
    _id: ID! 
    name: String!
    isUserTag: Boolean
    isEventTag: Boolean
    isPictureTag: Boolean
    validated: Boolean
}`;

exports.TagInputData = `
input TagInputData {
    name: String
    isUserTag: Boolean
    isEventTag: Boolean
    isPictureTag: Boolean
    validated: Boolean
}`;

exports.TagQueries = `
    getTags: [Tag]
    `;

exports.TagMutations = `
    addTag(tagInput: TagInputData!): Tag!
    updateTag(tagId: ID!, tagInput: TagInputData!): Tag!
    deleteTag(tagId: ID!): Boolean!
`;
