import * as admincontactResolver from "./resolvers/admincontactResolver.js";
import * as adminlinkResolver from "./resolvers/adminlinkResolver.js";
import * as artistResolver from "./resolvers/artistResolver.js";
import * as chatResolver from "./resolvers/chatResolver.js";
import * as commentResolver from "./resolvers/commentResolver.js";
import * as darkResolver from "./resolvers/darkResolver.js";
import * as dresscodeResolver from "./resolvers/dresscodeResolver.js";
import * as equipmentResolver from "./resolvers/equipmentResolver.js";
import * as eventResolver from "./resolvers/eventResolver.js";
import * as eventtypeResolver from "./resolvers/eventtypeResolver.js";
import * as partnertypeResolver from "./resolvers/partnertypeResolver.js";
import * as locationResolver from "./resolvers/locationResolver.js";
import * as messageResolver from "./resolvers/messageResolver.js";
import * as notificationResolver from "./resolvers/notificationResolver.js";
import * as photoResolver from "./resolvers/photoResolver.js";
import * as partnerResolver from "./resolvers/partnerResolver.js";
import * as subscriberResolver from "./resolvers/subscriberResolver.js";
import * as userResolver from "./resolvers/userResolver.js";
import * as visitorResolver from "./resolvers/visitorResolver.js";
import * as tagResolver from "./resolvers/tagResolver.js";
import * as translationResolver from "./resolvers/translationResolver.js";

export default {
  ...admincontactResolver.admincontactResolver,
  ...adminlinkResolver.adminlinkResolver,
  ...artistResolver.artistResolver,
  ...chatResolver.chatResolver,
  ...darkResolver.darkResolver,
  ...dresscodeResolver.dresscodeResolver,
  ...equipmentResolver.equipmentResolver,
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
  ...translationResolver.translationResolver,
};
