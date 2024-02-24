const { Visitor } = require("../../models/Visitor");

exports.visitorResolver = {
  // getVisitor
  async getVisitor(args, req) {
    return await Visitor.findAll({
      where: {
        visitedId: req.userId,
      },
    });
  },

  // addVisitor(visitorInput: VisitorInputData!): Visitor!
  async addVisitor(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const visitor = new Visitor({
      userId: req.userId,
      visitorId: req.userId,
      visitedId: args.visitedId,
    });
    return visitor.save();
  },
};
