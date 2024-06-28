import { Dresscode } from "../../../models/Dresscode.js";

export default async function getDresscodes() {
  const result = await Dresscode.findAll({
    order: [
      ["validated", "DESC"],
      ["name", "ASC"],
    ],
  });
  return result.map((dresscode) => {
    return { id: dresscode.dataValues.id, name: dresscode.dataValues.name };
  });
}
