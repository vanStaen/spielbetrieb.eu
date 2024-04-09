export const Artist = `
type Artist {
    _id: ID! 
    name: String!
    pictures: [String]
    links: [String]
    type: Int
    validated: Boolean
    reviews: [String]
    createdAt: String!
    updatedAt: String!
}`;

export const ArtistInputData = `
input ArtistInputData {
    _id: ID! 
    name: String!
    pictures: [String]
    links: [String]
    type: Int
    validated: Boolean
    reviews: [String]
}`;

export const ArtistQueries = `
    getArtist(artistId: ID!): Artist
    getArtists(onlyValidated: Boolean): [Artist]
    `;

export const ArtistMutations = `
    addArtist(artistInput: ArtistInputData!): Artist!
    updateArtist(artistId: ID!, artistInput: ArtistInputData!): Artist!
    deleteArtist(artistId: ID!): Boolean!
`;
