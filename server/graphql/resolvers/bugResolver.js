import { Bug } from "../../models/Bug.js";
import { User } from "../../models/User.js";
import { deleteFileFromS3 } from "../../lib/S3/deleteFileFromS3.js";
import { notificationService } from "../../api/service/notificationService.js";

export const bugResolver = {
  // getBugs: [Bug]
  async getBugs() {
    return await Bug.findAll({
      order: [["id", "ASC"]],
    });
  },

  // addBug(bugInput: BugInputData!): Bug!
  async addBug(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    try {
      const bug = new Bug({
        userId: req.userId,
        category: args.bugInput.category,
        desc: args.bugInput.desc,
        screenshot: args.bugInput.screenshot,
        isUrgent: args.bugInput.isUrgent,
        isResolved: args.bugInput.isResolved,
      });
      const newBug = await bug.save();
      notificationService.createNotificationForAdmin(
        "bugs",
        99,
        foundUser.userName,
        foundUser.id,
        args.bugInput.screenshot,
      );
      return newBug;
    } catch (err) {
      console.log(err);
    }
  },

  // updateBug(bugId: ID!, bugInput: BugInputData!): Bug!
  async updateBug(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "category",
      "desc",
      "screenshot",
      "isUrgent",
      "isResolved",
    ];
    updatableFields.forEach((field) => {
      if (field in args.bugInput) {
        updateFields[field] = args.bugInput[field];
      }
    });
    try {
      const updatedBug = await Bug.update(updateFields, {
        where: {
          id: args.bugId,
        },
        returning: true,
        plain: true,
      });
      // updatedBug[0]: number or row udpated
      // updatedBug[1]: rows updated
      return updatedBug[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteBug(bugId: ID!): Boolean!
  async deleteBug(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    const bugToDelete = await Bug.findOne({
      where: {
        id: args.bugId,
      },
    });
    const url = bugToDelete.screenshot;
    if (url) {
      await deleteFileFromS3(url, "bugs");
    }
    await Bug.destroy({
      where: {
        id: args.bugId,
      },
    });
    return true;
  },
};
