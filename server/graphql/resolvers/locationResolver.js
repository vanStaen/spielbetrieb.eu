const { Location } = require("../../models/Location");
const { User } = require("../../models/User");

exports.locationResolver = {
  // getLocation(locationId: ID!): Location
  async getLocation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
    }
    return await Location.findOne({
      where: { _id: req.locationId },
    });
  },

  // getLocations: [Location]
  async getLocations(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
    }
    return await Location.findAll({});
  },

  // addLocation(locationInput: LocationInputData!): Location!
  async addLocation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
    }
    try {
      const location = new Location({
        name: args.locationInput.name,
        description: args.locationInput.description,
        pictures: args.locationInput.pictures,
        links: args.locationInput.links,
        address: args.locationInput.address,
        coordinates: args.locationInput.coordinates,
        validated: args.locationInput.validated,
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
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
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
          _id: args.locationId,
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
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
    }
    await Location.destroy({
      where: {
        _id: args.locationId,
      },
    });
    return true;
  },
};
