import { buildSchema } from "graphql";

import * as admincontactSchema from "./schemas/admincontactSchema.js";
import * as adminlinkSchema from "./schemas/adminlinkSchema.js";
import * as artistSchema from "./schemas/artistSchema.js";
import * as bugSchema from "./schemas/bugSchema.js";
import * as chatSchema from "./schemas/chatSchema.js";
import * as commentSchema from "./schemas/commentSchema.js";
import * as darkSchema from "./schemas/darkSchema.js";
import * as dresscodeSchema from "./schemas/dresscodeSchema.js";
import * as equipmentSchema from "./schemas/equipmentSchema.js";
import * as eventSchema from "./schemas/eventSchema.js";
import * as eventtypeSchema from "./schemas/eventtypeSchema.js";
import * as genderSchema from "./schemas/genderSchema.js";
import * as partnertypeSchema from "./schemas/partnertypeSchema.js";
import * as partnerSchema from "./schemas/partnerSchema.js";
import * as locationSchema from "./schemas/locationSchema.js";
import * as messageSchema from "./schemas/messageSchema.js";
import * as notificationSchema from "./schemas/notificationSchema.js";
import * as orientationSchema from "./schemas/orientationSchema.js";
import * as photoSchema from "./schemas/photoSchema.js";
import * as reviewSchema from "./schemas/reviewSchema.js";
import * as userSchema from "./schemas/userSchema.js";
import * as visitorSchema from "./schemas/visitorSchema.js";
import * as subscriberSchema from "./schemas/subscriberSchema.js";
import * as tagSchema from "./schemas/tagSchema.js";
import * as translationSchema from "./schemas/translationSchema.js";

export default buildSchema(`

    ${admincontactSchema.Admincontact}
    ${adminlinkSchema.Adminlink}
    ${artistSchema.Artist}
    ${bugSchema.Bug}
    ${chatSchema.Chat}
    ${commentSchema.Comment}
    ${darkSchema.Dark}
    ${dresscodeSchema.Dresscode}
    ${equipmentSchema.Equipment}
    ${eventSchema.Event}
    ${eventtypeSchema.Eventtype}
    ${genderSchema.Gender}
    ${partnertypeSchema.Partnertype}
    ${partnerSchema.Partner}
    ${locationSchema.Location}
    ${messageSchema.Message}
    ${notificationSchema.Notification}
    ${orientationSchema.Orientation}
    ${photoSchema.Photo}
    ${reviewSchema.Review}
    ${userSchema.User}
    ${visitorSchema.Visitor}
    ${subscriberSchema.Subscriber}
    ${tagSchema.Tag}
    ${translationSchema.Translation}

    ${admincontactSchema.AdmincontactInputData}
    ${adminlinkSchema.AdminlinkInputData}
    ${artistSchema.ArtistAdminInputData}
    ${artistSchema.ArtistInputData}
    ${bugSchema.BugInputData}
    ${chatSchema.ChatInputData}
    ${commentSchema.CommentInputData}
    ${darkSchema.DarkInputData}
    ${dresscodeSchema.DresscodeInputData}
    ${equipmentSchema.EquipmentInputData}
    ${eventSchema.EventInputData}
    ${eventtypeSchema.EventtypeInputData}
    ${genderSchema.GenderInputData}
    ${partnertypeSchema.PartnertypeInputData}
    ${partnerSchema.PartnerInputData}
    ${locationSchema.LocationInputData}
    ${messageSchema.MessageInputData}
    ${orientationSchema.OrientationInputData}
    ${photoSchema.PhotoInputData}
    ${reviewSchema.ReviewInputData}
    ${userSchema.UserInputData}
    ${userSchema.UserInputDataAdmin}
    ${subscriberSchema.SubscriberInputData}
    ${tagSchema.TagInputData}
    ${translationSchema.TranslationInputData}

    type RootQuery {
        ${admincontactSchema.AdmincontactQueries}
        ${adminlinkSchema.AdminlinkQueries}
        ${artistSchema.ArtistQueries}
        ${bugSchema.BugQueries}
        ${chatSchema.ChatQueries}
        ${commentSchema.CommentQueries}
        ${darkSchema.DarkQueries}
        ${dresscodeSchema.DresscodeQueries}
        ${equipmentSchema.EquipmentQueries}
        ${eventSchema.EventQueries}
        ${eventtypeSchema.EventtypeQueries}
        ${genderSchema.GenderQueries}
        ${partnertypeSchema.PartnertypeQueries}
        ${partnerSchema.PartnerQueries}
        ${locationSchema.LocationQueries}
        ${messageSchema.MessageQueries}
        ${notificationSchema.NotificationQueries}
        ${orientationSchema.OrientationQueries}
        ${photoSchema.PhotoQueries}
        ${reviewSchema.ReviewQueries}
        ${userSchema.UserQueries}
        ${visitorSchema.VisitorQueries}
        ${subscriberSchema.SubscriberQueries}
        ${tagSchema.TagQueries}
        ${translationSchema.TranslationQueries}
    }

    type RootMutations {
        ${admincontactSchema.AdmincontactMutations}
        ${adminlinkSchema.AdminlinkMutations}
        ${artistSchema.ArtistMutations}
        ${bugSchema.BugMutations}
        ${chatSchema.ChatMutations}
        ${commentSchema.CommentMutations}
        ${darkSchema.DarkMutations}
        ${dresscodeSchema.DresscodeMutations}
        ${equipmentSchema.EquipmentMutations}
        ${eventSchema.EventMutations}
        ${eventtypeSchema.EventtypeMutations}
        ${genderSchema.GenderMutations}
        ${partnertypeSchema.PartnertypeMutations}
        ${partnerSchema.PartnerMutations}
        ${locationSchema.LocationMutations}
        ${messageSchema.MessageMutations}
        ${notificationSchema.NotificationMutations}
        ${orientationSchema.OrientationMutations}
        ${photoSchema.PhotoMutations}
        ${reviewSchema.ReviewMutations}
        ${userSchema.UserMutations}
        ${visitorSchema.VisitorMutations}
        ${subscriberSchema.SubscriberMutations}
        ${tagSchema.TagMutations}
        ${translationSchema.TranslationMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);
