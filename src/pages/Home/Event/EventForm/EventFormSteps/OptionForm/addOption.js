import { addTag } from "../../../../../Admin/AdminData/AdminTags/addTag.js";

export const addOption = async (option, usecase) => {
  if (table === "tag") {
    const dataObjectTag = {
      name: `{"en":"${option}", "de":"${option}"}`,
      isEventTag: true,
    };
    const res = await addTag(dataObjectTag);
    return parseInt(res._id);
  } else if (usecase === "artist") {
    const dataObjectArtist = {
      name: option,
    };
    const res = await addArtist(dataObjectArtist);
    return parseInt(res._id);
  }
};
