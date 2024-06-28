import { Tag } from "../../../models/Tag.js";

export default async function getTags() {
  const result = await Tag.findAll({
    order: [
      ["validated", "DESC"],
      ["name", "ASC"],
    ],
  });
  return result.map((tag) => {
    return { id: tag.dataValues.id, name: tag.dataValues.name };
  });
}
