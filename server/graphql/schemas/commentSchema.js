exports.Comment = `
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

exports.CommentInputData = `
input CommentInputData {
    photoId: Int
    comment: String
    likes: [Int]
    dislikes: [Int]
}`;

exports.CommentQueries = `
    getComments(photoId: Int!): [Comment]
`;

exports.CommentMutations = `
    addComment(commentInput: CommentInputData!): Comment!
    updateComment(commentId: ID!, commentInput: CommentInputData!): Comment!
    deleteComment(commentId: ID!): Boolean!
`;
