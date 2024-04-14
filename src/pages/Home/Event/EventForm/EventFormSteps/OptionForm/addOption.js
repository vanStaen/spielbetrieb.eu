import { addTag } from "../../../../../Admin/AdminData/AdminTags/addTag.js";
import { addArtist } from "../../../../../Admin/AdminData/AdminArtists/addArtist.js";
import { addDresscode } from "../../../../../Admin/AdminData/AdminDresscodes/addDresscode.js";

export const addOption = async (option, usecase) => {
  if (usecase === "tag") {
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
  } else if (usecase === "dresscode") {
    const dataObjectDresscodeTag = {
      name: `{"en":"${option}", "de":"${option}"}`,
    };
    const res = await addDresscode(dataObjectDresscodeTag);
    return parseInt(res._id);
  }
};
