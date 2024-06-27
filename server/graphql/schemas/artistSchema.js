export const Artist = `
type Artist {
    _id: ID! 
    name: String!
    description: String
    pictures: [String]
    links: [String]
    artistType: Int
    validated: Boolean
    reviews: [String]
    createdAt: Float!
    updatedAt: Float!
}`;

export const ArtistAdminInputData = `
input ArtistAdminInputData {
    name: String
    description: String
    pictures: [String]
    links: [String]
    artistType: Int
    validated: Boolean
    reviews: [String]
}`;

export const ArtistInputData = `
input ArtistInputData {
    description: String
    pictures: [String]
    links: [String]
    reviews: [String]
}`;

export const ArtistQueries = `
    getArtist(artistId: ID!): Artist
    getArtists: [Artist]
    `;

export const ArtistMutations = `
    addArtist(artistInput: ArtistInputData!): Artist!
    updateArtist(artistId: ID!, artistInput: ArtistInputData!): Artist!
    updateArtistAsAdmin(artistId: ID!, artistInput: ArtistAdminInputData!): Artist!
    deleteArtist(artistId: ID!): Boolean!
`;
