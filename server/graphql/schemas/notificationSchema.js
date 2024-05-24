export const Notification = `
type Notification {
    _id: ID! 
    userId: Int!
    photoLinkId: Int
    userLinkId: Int
    eventLinkId: Int
    seen: Boolean
    type: Int!
    data: String
    actionData: Int
    mediaUrl: String
    createdAt: Float!
    updatedAt: Float!
}`;

export const NotificationQueries = `
    getAllNotifications: [Notification]
    getNotifications: [Notification]
`;

export const NotificationMutations = `
    updateNotification(notificationId: ID!, seen: Boolean!): Notification!
    deleteNotification(notificationId: ID!): Boolean!
`;
