import { Comment } from "../../models/Comment.js";
import { User } from "../../models/User.js";
import { Photo } from "../../models/Photo.js";

export const commentResolver = {
  // getComment
  async getComments(args, req) {
    return await Comment.findAll({
      where: {
        photoId: args.photoId,
      },
      include: [User, Photo],
    });
  },

  // addComment(commentInput: CommentInputData!): Comment!
  async addComment(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const comment = new Comment({
      userId: req.userId,
      photoId: args.commentInput.photoId,
      comment: args.commentInput.comment,
    });
    return comment.save();
  },

  // updateComment(commentId: ID!, commentInput: CommentInputData!): Comment!
  async updateComment(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = ["likes", "dislikes", "comment"];
    updatableFields.forEach((field) => {
      if (field in args.commentInput) {
        updateFields[field] = args.commentInput[field];
      }
    });
    try {
      const updatedComment = await Comment.update(updateFields, {
        where: {
          id: args.commentId,
        },
        returning: true,
        plain: true,
      });
      // updatedComment[0]: number or row udpated
      // updatedComment[1]: rows updated
      return updatedComment[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteComment(id: ID!): Boolean!
  async deleteComment(args, req) {
    await Comment.destroy({
      where: {
        id: args.commentId,
      },
    });
    return true;
  },
};
