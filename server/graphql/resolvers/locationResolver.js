import { Location } from "../../models/Location.js";
import { User } from "../../models/User.js";

export const locationResolver = {
  // getLocation(locationId: ID!): Location
  async getLocation(args) {
    return await Location.findOne({
      where: { id: args.locationId },
    });
  },

  // getLocations(onlyValidated: Boolean): [Location]
  async getLocations(args) {
    let options = {
      order: [
        ["validated", "DESC"],
        ["name", "ASC"],
      ],
    };
    if (args.onlyValidated) {
      options = {
        order: [["name", "ASC"]],
        where: { validated: args.onlyValidated },
      };
    }
    return await Location.findAll(options);
  },

  // addLocation(locationInput: LocationInputData!): Location!
  async addLocation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    let validated = args.artistInput.validated;
    if (!foundUser.isAdmin) {
      validated = false;
    }
    try {
      const location = new Location({
        name: args.locationInput.name,
        description: args.locationInput.description,
        pictures: args.locationInput.pictures,
        links: args.locationInput.links,
        address: args.locationInput.address,
        coordinates: args.locationInput.coordinates,
        validated,
        reviews: args.locationInput.reviews,
      });
      return await location.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateLocation(locationId: ID!, locationInput: LocationInputData!): Location!
  async updateLocation(args, req) {
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
      "name",
      "description",
      "pictures",
      "links",
      "address",
      "coordinates",
      "validated",
      "reviews",
    ];
    updatableFields.forEach((field) => {
      if (field in args.locationInput) {
        updateFields[field] = args.locationInput[field];
      }
    });
    try {
      const updatedLocation = await Location.update(updateFields, {
        where: {
          id: args.locationId,
        },
        returning: true,
        plain: true,
      });
      // updatedLocation[0]: number or row udpated
      // updatedLocation[1]: rows updated
      return updatedLocation[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteLocation(locationId: ID!): Boolean!
  async deleteLocation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Location.destroy({
      where: {
        id: args.locationId,
      },
    });
    return true;
  },
};
