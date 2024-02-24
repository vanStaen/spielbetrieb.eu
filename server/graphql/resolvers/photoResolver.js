const { Photo } = require("../../models/Photo");
const { User } = require("../../models/User");
const { Comment } = require("../../models/Comment");

exports.photoResolver = {
  // getPhoto
  async getPhotos(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Photo.findAll({
      where: {
        userId: req.userId,
      },
      include: [User, Comment],
    });
  },

  // addPhoto(photoInput: PhotoInputData!): Photo!
  async addPhoto(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const photo = new Photo({
        userId: req.userId,
        photoUrl: args.photoInput.photoUrl,
        photoUrlThumb: args.photoInput.photoUrlThumb,
        photoUrlThumbBlur: args.photoInput.photoUrlThumbBlur,
        flagOver18: args.photoInput.flagOver18,
        tags: args.photoInput.tags,
        private: args.photoInput.private,
      });
      return await photo.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updatePhoto(photoInput: PhotoInputData!): Photo!
  async updatePhoto(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "flagOver18",
      "tags",
      "likes",
      "archived",
      "private",
    ];
    updatableFields.forEach((field) => {
      if (field in args.photoInput) {
        updateFields[field] = args.photoInput[field];
      }
    });
    try {
      const updatedPhoto = await Photo.update(updateFields, {
        where: {
          _id: args.photoId,
        },
        returning: true,
        plain: true,
      });
      // updatedPhoto[0]: number or row udpated
      // updatedPhoto[1]: rows updated
      return updatedPhoto[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deletePhoto(id: ID!): Boolean!
  async deletePhoto(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Photo.destroy({
      where: {
        _id: args.photoId,
      },
    });
    return true;
  },
};
