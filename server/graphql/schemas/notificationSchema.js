export const Notification = `
type Notification {
    _id: ID! 
    userId: Int!
    notification: String!
    photoLinkId: Int
    userLinkId: Int
    eventLinkId: Int
    seen: Boolean
    type: Int!
    actionData: Int
    mediaUrl: String
    createdAt: Float!
    updatedAt: Float!
}`;

export const NotificationQueries = `
    getNotifications: [Notification]
`;

export const NotificationMutations = `
    updateNotification(notificationId: ID!, seen: Boolean!): Notification!
    deleteNotification(notificationId: ID!): Boolean!
`;
