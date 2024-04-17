import React from "react";
import { observer } from "mobx-react";

import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { OptionFormEventsTags } from "./OptionFormEventsTags";
import { OptionFormLinks } from "./OptionFormLinks";
import { OptionFormPrices } from "./OptionFormPrices";
import { OptionFormDresscodes } from "./OptionFormDresscodes";
import { OptionFormLineUp } from "./OptionFormLineUp";
import { OptionFormEquipements } from "./OptionFormEquipements";
import { OptionFormPrivateEvent } from "./OptionFormPrivateEvent";
import { OptionFormAgeMin } from "./OptionFormAgeMin";

import "./OptionForm.less";

export const OptionForm = observer((props) => {
  const {
    tagsOptions,
    fetchTags,
    dresscodesOptions,
    fetchDresscodes,
    equipmentsOptions,
    fetchArtists,
    artistsOptions,
  } = props;

  return (
    <div
      className={`optionform__container  ${
        pageStore.selectedTheme === "light"
          ? "lightColorTheme__Text"
          : "darkColorTheme__Text"
      }`}
    >
      <OptionFormEventsTags tagsOptions={tagsOptions} fetchTags={fetchTags} />
      <OptionFormLinks />
      <OptionFormPrices />
      <OptionFormDresscodes
        dresscodesOptions={dresscodesOptions}
        fetchDresscodes={fetchDresscodes}
      />
      <OptionFormLineUp
        artistsOptions={artistsOptions}
        fetchArtists={fetchArtists}
      />
      <OptionFormEquipements equipmentsOptions={equipmentsOptions} />
      <OptionFormAgeMin />
      <OptionFormPrivateEvent />
    </div>
  );
});
