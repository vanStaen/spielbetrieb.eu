export const Equipment = `
type Equipment {
    _id: ID! 
    name: String!
    media: String
    validated: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const EquipmentInputData = `
input EquipmentInputData {
    name: String
    media: String
    validated: Boolean
}`;

export const EquipmentQueries = `
    getEquipments: [Equipment]
    `;

export const EquipmentMutations = `
    addEquipment(equipmentInput: EquipmentInputData!): Equipment!
    updateEquipment(equipmentId: ID!, equipmentInput: EquipmentInputData!): Equipment!
    deleteEquipment(equipmentId: ID!): Boolean!
`;
