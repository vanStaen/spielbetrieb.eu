const chatResolver = require("./resolvers/chatResolver");
const commentResolver = require("./resolvers/commentResolver");
const eventResolver = require("./resolvers/eventResolver");
const messageResolver = require("./resolvers/messageResolver");
const notificationResolver = require("./resolvers/notificationResolver");
const photoResolver = require("./resolvers/photoResolver");
const subscriberResolver = require("./resolvers/subscriberResolver");
const userResolver = require("./resolvers/userResolver");
const visitorResolver = require("./resolvers/visitorResolver");

module.exports = {
  ...chatResolver.chatResolver,
  ...commentResolver.commentResolver,
  ...eventResolver.eventResolver,
  ...messageResolver.messageResolver,
  ...photoResolver.photoResolver,
  ...subscriberResolver.subscriberResolver,
  ...userResolver.userResolver,
  ...visitorResolver.visitorResolver,
  ...notificationResolver.notificationResolver,
};
