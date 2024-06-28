export const Comment = `
type Comment {
    id: ID! 
    userId: Int!
    photoId: Int!
    comment: String!
    likes: [Int]
    dislikes: [Int]
    user: User
    photo: Photo
    createdAt: Float!
    updatedAt: Float!
}`;

export const CommentInputData = `
input CommentInputData {
    photoId: Int
    comment: String
    likes: [Int]
    dislikes: [Int]
}`;

export const CommentQueries = `
    getComments(photoId: Int!): [Comment]
`;

export const CommentMutations = `
    addComment(commentInput: CommentInputData!): Comment!
    updateComment(commentId: ID!, commentInput: CommentInputData!): Comment!
    deleteComment(commentId: ID!): Boolean!
`;
