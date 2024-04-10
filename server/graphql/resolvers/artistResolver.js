import { Artist } from "../../models/Artist.js";
import { User } from "../../models/User.js";

export const artistResolver = {
  // getArtist(artistId: ID!): Artist
  async getArtist(args) {
    return await Artist.findOne({
      where: { _id: args.artistId },
    });
  },

  // getArtists(onlyValidated: Boolean): [Artist]
  async getArtists(args) {
    let options = {
      order: [["name", "ASC"]],
    };
    if (args.onlyValidated) {
      options = {
        order: [["name", "ASC"]],
        where: { validated: args.onlyValidated },
      };
    }
    return await Artist.findAll(options);
  },

  // addArtist(artistInput: ArtistInputData!): Artist!
  async addArtist(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    let validated = args.artistInput.validated;
    if (!foundUser.isAdmin) {
      validated = false;
    }
    try {
      const artist = new Artist({
        name: args.artistInput.name,
        pictures: args.artistInput.pictures,
        links: args.artistInput.links,
        validated,
        reviews: args.artistInput.reviews,
      });
      return await artist.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateArtist(artistId: ID!, artistInput: ArtistInputData!): Artist!
  async updateArtist(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "name",
      "pictures",
      "links",
      "validated",
      "reviews",
    ];
    updatableFields.forEach((field) => {
      if (field in args.artistInput) {
        updateFields[field] = args.artistInput[field];
      }
    });
    try {
      const updatedArtist = await Artist.update(updateFields, {
        where: {
          _id: args.artistId,
        },
        returning: true,
        plain: true,
      });
      // updatedArtist[0]: number or row udpated
      // updatedArtist[1]: rows updated
      return updatedArtist[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteArtist(artistId: ID!): Boolean!
  async deleteArtist(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Artist.destroy({
      where: {
        _id: args.artistId,
      },
    });
    return true;
  },
};
