const mailService = require("../../api/service/mailService");

const { Subscriber } = require("../../models/Subscriber");;

exports.subscriberResolver = {

  // getSubscribers: [Subscriber]
  async getSubscribers(args, req) {
    if (!req.isAdmin) {
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
      const subscriber = new Subscriber({
        name: args.subscriberInput.name,
        email: email,
        about: args.subscriberInput.about,
        interests: args.userInput.interests,
        interests: args.userInput.lists,
        language: args.userInput.language,
      });
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
      "name",
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
