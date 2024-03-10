const { buildSchema } = require("graphql");

const admincontactSchema = require("./schemas/admincontactSchema");
const adminlinkSchema = require("./schemas/adminlinkSchema");
const chatSchema = require("./schemas/chatSchema");
const commentSchema = require("./schemas/commentSchema");
const darkSchema = require("./schemas/darkSchema");
const eventSchema = require("./schemas/eventSchema");
const eventtypeSchema = require("./schemas/eventtypeSchema");
const partnertypeSchema = require("./schemas/partnertypeSchema");
const partnerSchema = require("./schemas/partnerSchema");
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
    ${darkSchema.Dark}
    ${eventSchema.Event}
    ${eventtypeSchema.Eventtype}
    ${partnertypeSchema.Partnertype}
    ${partnerSchema.Partner}
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
    ${darkSchema.DarkInputData}
    ${eventSchema.EventInputData}
    ${eventtypeSchema.EventtypeInputData}
    ${partnertypeSchema.PartnertypeInputData}
    ${partnerSchema.PartnerInputData}
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
        ${darkSchema.DarkQueries}
        ${eventSchema.EventQueries}
        ${eventtypeSchema.EventtypeQueries}
        ${partnertypeSchema.PartnertypeQueries}
        ${partnerSchema.PartnerQueries}
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
        ${darkSchema.DarkMutations}
        ${eventSchema.EventMutations}
        ${eventtypeSchema.EventtypeMutations}
        ${partnertypeSchema.PartnertypeMutations}
        ${partnerSchema.PartnerMutations}
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
