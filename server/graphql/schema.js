const { buildSchema } = require("graphql");

const chatSchema = require("./schemas/chatSchema");
const commentSchema = require("./schemas/commentSchema");
const eventSchema = require("./schemas/eventSchema");
const messageSchema = require("./schemas/messageSchema");
const notificationSchema = require("./schemas/notificationSchema");
const photoSchema = require("./schemas/photoSchema");
const userSchema = require("./schemas/userSchema");
const visitorSchema = require("./schemas/visitorSchema");
const subscriberSchema = require("./schemas/subscriberSchema");

module.exports = buildSchema(`

    ${chatSchema.Chat}
    ${commentSchema.Comment}
    ${eventSchema.Event}
    ${messageSchema.Message}
    ${notificationSchema.Notification}
    ${photoSchema.Photo}
    ${userSchema.User}
    ${visitorSchema.Visitor}
    ${subscriberSchema.Subscriber}

    ${chatSchema.ChatInputData}
    ${commentSchema.CommentInputData}
    ${eventSchema.EventInputData}
    ${messageSchema.MessageInputData}
    ${notificationSchema.NotificationInputData}
    ${photoSchema.PhotoInputData}
    ${userSchema.UserInputData}
    ${subscriberSchema.SubscriberInputData}

    type RootQuery {
        ${chatSchema.ChatQueries}
        ${commentSchema.CommentQueries}
        ${eventSchema.EventQueries}
        ${messageSchema.MessageQueries}
        ${notificationSchema.NotificationQueries}
        ${photoSchema.PhotoQueries}
        ${userSchema.UserQueries}
        ${visitorSchema.VisitorQueries}
        ${subscriberSchema.SubscriberQueries}
    }

    type RootMutations {
        ${chatSchema.ChatMutations}
        ${commentSchema.CommentMutations}
        ${eventSchema.EventMutations}
        ${messageSchema.MessageMutations}
        ${notificationSchema.NotificationMutations}
        ${photoSchema.PhotoMutations}
        ${userSchema.UserMutations}
        ${visitorSchema.VisitorMutations}
        ${subscriberSchema.SubscriberMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);