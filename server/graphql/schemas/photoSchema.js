exports.Photo = `
type Photo {
    _id: ID! 
    userId: Int!
    photoUrl: String!
    photoUrlThumb: String!
    photoUrlThumbBlur: String!
    flagOver18: Boolean!
    tags: [String]
    likes: [Int]
    archived: Boolean
    private: Boolean!
    createdAt: String!
    udpatedAt: String!
    user: User
    comment: [Comment]
}`;

exports.PhotoInputData = `
input PhotoInputData {
    photoUrl: String
    photoUrlThumb: String
    photoUrlThumbBlur: String
    flagOver18: Boolean
    tags: [String]
    likes: [Int]
    archived: Boolean
    private: Boolean
}`;

exports.PhotoQueries = `
    getPhotos: [Photo]
`;

exports.PhotoMutations = `
    addPhoto(photoInput: PhotoInputData!): Photo!
    updatePhoto(photoId: ID!, photoInput: PhotoInputData!): Photo!
    deletePhoto(photoId: ID!): Boolean!
`;
