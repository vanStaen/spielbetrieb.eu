import { buildSchema } from "graphql";

import * as admincontactSchema from "./schemas/admincontactSchema.js";
import * as adminlinkSchema from "./schemas/adminlinkSchema.js";
import * as artistSchema from "./schemas/artistSchema.js";
import * as chatSchema from "./schemas/chatSchema.js";
import * as commentSchema from "./schemas/commentSchema.js";
import * as darkSchema from "./schemas/darkSchema.js";
import * as dresscodeSchema from "./schemas/dresscodeSchema.js";
import * as equipmentSchema from "./schemas/equipmentSchema.js";
import * as eventSchema from "./schemas/eventSchema.js";
import * as eventtypeSchema from "./schemas/eventtypeSchema.js";
import * as partnertypeSchema from "./schemas/partnertypeSchema.js";
import * as partnerSchema from "./schemas/partnerSchema.js";
import * as locationSchema from "./schemas/locationSchema.js";
import * as messageSchema from "./schemas/messageSchema.js";
import * as notificationSchema from "./schemas/notificationSchema.js";
import * as photoSchema from "./schemas/photoSchema.js";
import * as userSchema from "./schemas/userSchema.js";
import * as visitorSchema from "./schemas/visitorSchema.js";
import * as subscriberSchema from "./schemas/subscriberSchema.js";
import * as tagSchema from "./schemas/tagSchema.js";

export default buildSchema(`

    ${admincontactSchema.Admincontact}
    ${adminlinkSchema.Adminlink}
    ${artistSchema.Artist}
    ${chatSchema.Chat}
    ${commentSchema.Comment}
    ${darkSchema.Dark}
    ${dresscodeSchema.Dresscode}
    ${equipmentSchema.Equipment}
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
    ${artistSchema.ArtistInputData}
    ${chatSchema.ChatInputData}
    ${commentSchema.CommentInputData}
    ${darkSchema.DarkInputData}
    ${dresscodeSchema.DresscodeInputData}
    ${equipmentSchema.EquipmentInputData}
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
        ${artistSchema.ArtistQueries}
        ${chatSchema.ChatQueries}
        ${commentSchema.CommentQueries}
        ${darkSchema.DarkQueries}
        ${dresscodeSchema.DresscodeQueries}
        ${equipmentSchema.EquipmentQueries}
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
        ${artistSchema.ArtistMutations}
        ${chatSchema.ChatMutations}
        ${commentSchema.CommentMutations}
        ${darkSchema.DarkMutations}
        ${dresscodeSchema.DresscodeMutations}
        ${equipmentSchema.EquipmentMutations}
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
