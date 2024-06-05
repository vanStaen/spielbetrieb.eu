export const Orientation = `
type Orientation {
    _id: ID! 
    name: String!
    media: String
    validated: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const OrientationInputData = `
input OrientationInputData {
    name: String
    media: String
    validated: Boolean
}`;

export const OrientationQueries = `
    getOrientations: [Orientation]
    `;

export const OrientationMutations = `
    addOrientation(orientationInput: OrientationInputData!): Orientation!
    updateOrientation(orientationId: ID!, orientationInput: OrientationInputData!): Orientation!
    deleteOrientation(orientationId: ID!): Boolean!
`;
