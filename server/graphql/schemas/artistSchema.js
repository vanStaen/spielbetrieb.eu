export const Artist = `
type Artist {
    _id: ID! 
    name: String!
    pictures: [String]
    links: [String]
    artistType: Int
    validated: Boolean
    reviews: [String]
    createdAt: Float!
    updatedAt: Float!
}`;

export const ArtistInputData = `
input ArtistInputData {
    name: String
    pictures: [String]
    links: [String]
    artistType: Int
    validated: Boolean
    reviews: [String]
}`;

export const ArtistQueries = `
    getArtist(artistId: ID!): Artist
    getArtists: [Artist]
    `;

export const ArtistMutations = `
    addArtist(artistInput: ArtistInputData!): Artist!
    updateArtist(artistId: ID!, artistInput: ArtistInputData!): Artist!
    deleteArtist(artistId: ID!): Boolean!
`;
