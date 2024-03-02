const admincontactResolver = require("./resolvers/admincontactResolver");
const adminlinkResolver = require("./resolvers/adminlinkResolver");
const chatResolver = require("./resolvers/chatResolver");
const commentResolver = require("./resolvers/commentResolver");
const eventResolver = require("./resolvers/eventResolver");
const eventtypeResolver = require("./resolvers/eventtypeResolver");
const partnertypeResolver = require("./resolvers/partnertypeResolver");
const locationResolver = require("./resolvers/locationResolver");
const messageResolver = require("./resolvers/messageResolver");
const notificationResolver = require("./resolvers/notificationResolver");
const photoResolver = require("./resolvers/photoResolver");
const partnerResolver = require("./resolvers/partnerResolver");
const subscriberResolver = require("./resolvers/subscriberResolver");
const userResolver = require("./resolvers/userResolver");
const visitorResolver = require("./resolvers/visitorResolver");
const tagResolver = require("./resolvers/tagResolver");

module.exports = {
  ...admincontactResolver.admincontactResolver,
  ...adminlinkResolver.adminlinkResolver,
  ...chatResolver.chatResolver,
  ...commentResolver.commentResolver,
  ...eventResolver.eventResolver,
  ...eventtypeResolver.eventtypeResolver,
  ...partnertypeResolver.partnertypeResolver,
  ...locationResolver.locationResolver,
  ...messageResolver.messageResolver,
  ...photoResolver.photoResolver,
  ...partnerResolver.partnerResolver,
  ...subscriberResolver.subscriberResolver,
  ...userResolver.userResolver,
  ...visitorResolver.visitorResolver,
  ...notificationResolver.notificationResolver,
  ...tagResolver.tagResolver,
};
