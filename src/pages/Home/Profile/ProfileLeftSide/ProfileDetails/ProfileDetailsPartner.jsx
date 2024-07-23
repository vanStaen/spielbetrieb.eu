import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { partnerStore } from "../../../../../store/partnerStore/partnerStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { nameParser } from "../../../../../helpers/dev/nameParser";

import "./ProfileDetails.less";

const rounding = Math.floor; // default is Math.round
dayjs.extend(relativeTime, {
  rounding,
});

dayjs.extend(relativeTime);

export const ProfileDetailsPartner = observer(() => {
  const { t } = useTranslation();
  const [showLastSeenOnline, setShowLastSeenOnline] = useState(true);
  const [partnerTypeText, setPartnerTypeText] = useState(null);

  useEffect(() => {
    setPartnerTypeText(
      nameParser(
        pageStore.partnertypes.find(
          (partnertype) =>
            parseInt(partnertype.id) === partnerStore.partnertypeId,
        )?.name,
        pageStore.selectedLanguage,
      ),
    );
  }, [partnerStore.partnertypeId, pageStore.partnertypes]);

  useEffect(() => {
    if (!partnerStore.isLoading && partnerStore.profilSettings) {
      // 1: setShowLastSeenOnline(profileStore.profilSettings.showLastSeenOnline);
    }
  }, [partnerStore.isLoading, partnerStore.profilSettings]);

  const dateLastActive = new Date(parseInt(partnerStore.lastActive));

  return (
    <div className="profil__detailsContainer">
      <div className="profil__hello">
        <div className="profil__username">@{partnerStore.userName}</div>
        <div className="profil__details">Partner {partnerTypeText}</div>
        {showLastSeenOnline && (
          <div className="profil__lastSeenOnline">
            {t("profile.lastSeenOnline")} <br />{" "}
            {dateLastActive.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            {t("profile.at")} {dateLastActive.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
});
