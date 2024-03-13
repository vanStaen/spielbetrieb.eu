export const Notification = `
type Notification {
    _id: ID! 
    userId: Int!
    notification: String!
    photoLinkId: Int
    userLinkId: Int
    eventLinkId: Int
    seen: Boolean
    notificationType: String!
    createdAt: String!
    udpatedAt: String!
    user: User
}`;

export const NotificationInputData = `
input NotificationInputData {
    notification: String!
    photoLinkId: Int
    userLinkId: Int
    eventLinkId: Int
    notificationType: String!
}`;

export const NotificationQueries = `
    getNotifications: [Notification]
`;

export const NotificationMutations = `
    addNotification(notificationInput: NotificationInputData!): Notification!
    updateNotification(notificationId: ID!, seen: Boolean!): Notification!
`;
