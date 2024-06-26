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
  async getArtists() {
    return await Artist.findAll({
      order: [
        ["validated", "DESC"],
        ["name", "ASC"],
      ],
    });
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
        userId: req.userId,
        name: args.artistInput.name,
        description: args.artistInput.description,
        pictures: args.artistInput.pictures,
        links: args.artistInput.links,
        reviews: args.artistInput.reviews,
        artistType: args.artistInput.artistType,
        validated,
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
    const updateFields = [];
    const updatableFields = [
      "pictures",
      "description",
      "links",
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

  // updateArtistAsAdmin(artistId: ID!, artistInput: ArtistInputData!): Artist!
  async updateArtistAsAdmin(args, req) {
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
      "userId",
      "name",
      "description",
      "pictures",
      "links",
      "validated",
      "reviews",
      "artistType",
    ];
    updatableFields.forEach((field) => {
      if (field in args.artistInput) {
        updateFields[field] = args.artistInput[field];
      }
    });
    console.log(updateFields);
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
