export const Photo = `
type Photo {
    id: ID! 
    userId: Int!
    photoUrl: String!
    photoUrlThumb: String!
    photoUrlThumbBlur: String!
    flagOver18: Boolean!
    tags: [String]
    likes: [Int]
    archived: Boolean
    private: Boolean!
    user: User
    comment: [Comment]
    createdAt: Float!
    udpatedAt: Float!
}`;

export const PhotoInputData = `
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

export const PhotoQueries = `
    getPhotos: [Photo]
`;

export const PhotoMutations = `
    addPhoto(photoInput: PhotoInputData!): Photo!
    updatePhoto(photoId: ID!, photoInput: PhotoInputData!): Photo!
    deletePhoto(photoId: ID!): Boolean!
`;
