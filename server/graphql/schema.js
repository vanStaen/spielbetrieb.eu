const { buildSchema } = require("graphql");

const chatSchema = require("./schemas/chatSchema");
const commentSchema = require("./schemas/commentSchema");
const eventSchema = require("./schemas/eventSchema");
const eventTypeSchema = require("./schemas/eventTypeSchema");
const locationSchema = require("./schemas/locationSchema");
const messageSchema = require("./schemas/messageSchema");
const notificationSchema = require("./schemas/notificationSchema");
const photoSchema = require("./schemas/photoSchema");
const userSchema = require("./schemas/userSchema");
const visitorSchema = require("./schemas/visitorSchema");
const subscriberSchema = require("./schemas/subscriberSchema");
const tagSchema = require("./schemas/tagSchema");

module.exports = buildSchema(`

    ${chatSchema.Chat}
    ${commentSchema.Comment}
    ${eventSchema.Event}
    ${eventTypeSchema.EventType}
    ${locationSchema.Location}
    ${messageSchema.Message}
    ${notificationSchema.Notification}
    ${photoSchema.Photo}
    ${userSchema.User}
    ${visitorSchema.Visitor}
    ${subscriberSchema.Subscriber}
    ${tagSchema.Tag}

    ${chatSchema.ChatInputData}
    ${commentSchema.CommentInputData}
    ${eventSchema.EventInputData}
    ${eventTypeSchema.EventTypeInputData}
    ${locationSchema.LocationInputData}
    ${messageSchema.MessageInputData}
    ${notificationSchema.NotificationInputData}
    ${photoSchema.PhotoInputData}
    ${userSchema.UserInputData}
    ${subscriberSchema.SubscriberInputData}
    ${tagSchema.TagInputData}

    type RootQuery {
        ${chatSchema.ChatQueries}
        ${commentSchema.CommentQueries}
        ${eventSchema.EventQueries}
        ${eventTypeSchema.EventTypeQueries}
        ${locationSchema.LocationQueries}
        ${messageSchema.MessageQueries}
        ${notificationSchema.NotificationQueries}
        ${photoSchema.PhotoQueries}
        ${userSchema.UserQueries}
        ${visitorSchema.VisitorQueries}
        ${subscriberSchema.SubscriberQueries}
        ${tagSchema.TagQueries}
    }

    type RootMutations {
        ${chatSchema.ChatMutations}
        ${commentSchema.CommentMutations}
        ${eventSchema.EventMutations}
        ${eventTypeSchema.EventTypeMutations}
        ${locationSchema.LocationMutations}
        ${messageSchema.MessageMutations}
        ${notificationSchema.NotificationMutations}
        ${photoSchema.PhotoMutations}
        ${userSchema.UserMutations}
        ${visitorSchema.VisitorMutations}
        ${subscriberSchema.SubscriberMutations}
        ${tagSchema.TagMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);