import { addTag } from "../../../../../Admin/AdminData/AdminTags/addTag.js";
import { createNameObject } from "../../../../../../helpers/manipulation/createNameObject.js";

export const addOption = async (option, table) => {
  if (table === "tag") {
    const res = await addTag(createNameObject(option));
    return res._id;
  }
};
