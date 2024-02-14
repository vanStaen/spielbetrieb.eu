const { buildSchema } = require("graphql");

const admincontactSchema = require("./schemas/admincontactSchema");
const adminlinkSchema = require("./schemas/adminlinkSchema");
const chatSchema = require("./schemas/chatSchema");
const commentSchema = require("./schemas/commentSchema");
const eventSchema = require("./schemas/eventSchema");
const eventtypeSchema = require("./schemas/eventtypeSchema");
const partnertypeSchema = require("./schemas/partnertypeSchema");
const locationSchema = require("./schemas/locationSchema");
const messageSchema = require("./schemas/messageSchema");
const notificationSchema = require("./schemas/notificationSchema");
const photoSchema = require("./schemas/photoSchema");
const userSchema = require("./schemas/userSchema");
const visitorSchema = require("./schemas/visitorSchema");
const subscriberSchema = require("./schemas/subscriberSchema");
const tagSchema = require("./schemas/tagSchema");

module.exports = buildSchema(`

    ${admincontactSchema.Admincontact}
    ${adminlinkSchema.Adminlink}
    ${chatSchema.Chat}
    ${commentSchema.Comment}
    ${eventSchema.Event}
    ${eventtypeSchema.Eventtype}
    ${partnertypeSchema.Partnertype}
    ${locationSchema.Location}
    ${messageSchema.Message}
    ${notificationSchema.Notification}
    ${photoSchema.Photo}
    ${userSchema.User}
    ${visitorSchema.Visitor}
    ${subscriberSchema.Subscriber}
    ${tagSchema.Tag}

    ${admincontactSchema.AdmincontactInputData}
    ${adminlinkSchema.AdminlinkInputData}
    ${chatSchema.ChatInputData}
    ${commentSchema.CommentInputData}
    ${eventSchema.EventInputData}
    ${eventtypeSchema.EventtypeInputData}
    ${partnertypeSchema.PartnertypeInputData}
    ${locationSchema.LocationInputData}
    ${messageSchema.MessageInputData}
    ${notificationSchema.NotificationInputData}
    ${photoSchema.PhotoInputData}
    ${userSchema.UserInputData}
    ${userSchema.UserInputDataAdmin}
    ${subscriberSchema.SubscriberInputData}
    ${tagSchema.TagInputData}

    type RootQuery {
        ${admincontactSchema.AdmincontactQueries}
        ${adminlinkSchema.AdminlinkQueries}
        ${chatSchema.ChatQueries}
        ${commentSchema.CommentQueries}
        ${eventSchema.EventQueries}
        ${eventtypeSchema.EventtypeQueries}
        ${partnertypeSchema.PartnertypeQueries}
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
        ${admincontactSchema.AdmincontactMutations}
        ${adminlinkSchema.AdminlinkMutations}
        ${chatSchema.ChatMutations}
        ${commentSchema.CommentMutations}
        ${eventSchema.EventMutations}
        ${eventtypeSchema.EventtypeMutations}
        ${partnertypeSchema.PartnertypeMutations}
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