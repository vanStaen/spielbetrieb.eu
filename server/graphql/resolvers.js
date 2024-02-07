const chatResolver = require("./resolvers/chatResolver");
const commentResolver = require("./resolvers/commentResolver");
const eventResolver = require("./resolvers/eventResolver");
const eventtypeResolver = require("./resolvers/eventtypeResolver");
const locationResolver = require("./resolvers/locationResolver");
const messageResolver = require("./resolvers/messageResolver");
const notificationResolver = require("./resolvers/notificationResolver");
const photoResolver = require("./resolvers/photoResolver");
const subscriberResolver = require("./resolvers/subscriberResolver");
const userResolver = require("./resolvers/userResolver");
const visitorResolver = require("./resolvers/visitorResolver");
const tagResolver = require("./resolvers/tagResolver");

module.exports = {
  ...chatResolver.chatResolver,
  ...commentResolver.commentResolver,
  ...eventResolver.eventResolver,
  ...eventtypeResolver.eventtypeResolver,
  ...locationResolver.locationResolver,
  ...messageResolver.messageResolver,
  ...photoResolver.photoResolver,
  ...subscriberResolver.subscriberResolver,
  ...userResolver.userResolver,
  ...visitorResolver.visitorResolver,
  ...notificationResolver.notificationResolver,
  ...tagResolver.tagResolver,
};
