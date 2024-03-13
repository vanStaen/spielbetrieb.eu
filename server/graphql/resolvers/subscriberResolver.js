import { mailService } from "../../api/service/mailService.js";
import { Subscriber } from "../../models/Subscriber.js";
import { User } from "../../models/User.js";

export const subscriberResolver = {
  // getSubscribers: [Subscriber]
  async getSubscribers(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("newsletter")) {
      throw new Error("Unauthorized!");
    }
    return await Subscriber.findAll();
  },

  // addSubscriber(subscriberInput: SubscriberInputData!): Subscriber!
  async addSubscriber(args, req) {
    const foundSubscriberEmail = await Subscriber.findOne({
      where: {
        email: args.subscriberInput.email.toLowerCase(),
      },
    });
    if (foundSubscriberEmail) {
      throw new Error("This email is already subscribed to the newsletter.");
    }
    try {
      const email = args.subscriberInput.email.toLowerCase();
      const language = args.subscriberInput.language.toLowerCase();
      const inputFields = [];
      const inputableFields = [
        "about",
        "username",
        "language",
        "interests",
        "lists",
      ];
      inputableFields.forEach((field) => {
        if (field in args.subscriberInput) {
          inputFields[field] = args.subscriberInput[field];
        }
      });
      inputFields.email = email;
      const subscriber = new Subscriber(inputFields);
      await mailService.subscriberVerify(email, language);
      return await subscriber.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateSubscriber(subscriberInput: SubscriberInputData!): Subscriber!
  async updateSubscriber(args, req) {
    const updateFields = [];
    const updatableFields = [
      "about",
      "username",
      "language",
      "interests",
      "lists",
    ];
    updatableFields.forEach((field) => {
      if (field in args.subscriberInput) {
        updateFields[field] = args.subscriberInput[field];
      }
    });
    try {
      const updatedSubscriber = await Subscriber.update(updateFields, {
        where: {
          _id: args.subscriberId,
        },
        returning: true,
        plain: true,
      });
      // updatedSubscriber[0]: number or row udpated
      // updatedSubscriber[1]: rows updated
      return updatedSubscriber[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteSubscriber(_id: ID!): Boolean!
  async deleteSubscriber(args, req) {
    await Subscriber.destroy({
      where: {
        _id: args.subscriberId,
      },
    });
    req.session = null;
    return true;
  },
};
