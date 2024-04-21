export const Location = `
type Location {
    _id: ID! 
    name: String!
    description: String
    pictures: [String]
    links: [String]
    address: String
    coordinates: String
    validated: Boolean
    reviews: [String]
    createdAt: Float!
    updatedAt: Float!
}`;

export const LocationInputData = `
input LocationInputData {
    name: String
    description: String
    pictures: [String]
    links: [String]
    address: String
    coordinates: String
    validated: Boolean
    reviews: [String]
}`;

export const LocationQueries = `
    getLocation(locationId: ID!): Location
    getLocations(onlyValidated: Boolean): [Location]
    `;

export const LocationMutations = `
    addLocation(locationInput: LocationInputData!): Location!
    updateLocation(locationId: ID!, locationInput: LocationInputData!): Location!
    deleteLocation(locationId: ID!): Boolean!
`;
