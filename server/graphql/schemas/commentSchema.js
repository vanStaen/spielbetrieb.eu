export const Comment = `
type Comment {
    _id: ID! 
    userId: Int!
    photoId: Int!
    comment: String!
    likes: [Int]
    dislikes: [Int]
    createdAt: String!
    udpatedAt: String!
    user: User
    photo: Photo
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
