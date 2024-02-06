exports.Location = `
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
}`;

exports.LocationInputData = `
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

exports.LocationQueries = `
    getLocation(locationId: ID!): Location
    getLocations: [Location]
    `;

exports.LocationMutations = `
    addLocation(locationInput: LocationInputData!): Location!
    updateLocation(locationId: ID!, locationInput: LocationInputData!): Location!
    deleteLocation(locationId: ID!): Boolean!
`;
