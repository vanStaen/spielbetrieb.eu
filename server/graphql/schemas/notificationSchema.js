export const Notification = `
type Notification {
    id: ID! 
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
    updateAllNotificationSeen: Boolean!
    updateNotificationSeen(notificationId: ID!): Boolean!
    deleteNotification(notificationId: ID!): Boolean!
`;
