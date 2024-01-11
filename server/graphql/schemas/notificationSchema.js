exports.Notification = `
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

exports.NotificationInputData = `
input NotificationInputData {
    notification: String!
    photoLinkId: Int
    userLinkId: Int
    eventLinkId: Int
    notificationType: String!
}`;

exports.NotificationQueries = `
    getNotifications: [Notification]
`;

exports.NotificationMutations = `
    addNotification(notificationInput: NotificationInputData!): Notification!
    updateNotification(notificationId: ID!, seen: Boolean!): Notification!
`;
