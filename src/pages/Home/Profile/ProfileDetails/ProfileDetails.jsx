import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../store/profileStore/profileStore";

import "./ProfileDetails.less";

export const ProfileDetails = observer(() => {
  const { t } = useTranslation();
  const [showLastSeenOnline, setShowLastSeenOnline] = useState(false);
  const [showLastName, setShowLastName] = useState(false);
  const [showFirstName, setShowFirstName] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showSexualOrientation, setShowSexualOrientation] = useState(false);

  useEffect(() => {
    if (!profileStore.isLoading && profileStore.profilSettings) {
      setShowLastSeenOnline(profileStore.profilSettings.showLastSeenOnline);
      setShowLastName(profileStore.profilSettings.showLastName);
      setShowFirstName(profileStore.profilSettings.showFirstName);
      setShowGender(profileStore.profilSettings.showGender);
      setShowSexualOrientation(
        profileStore.profilSettings.showSexualOrientation,
      );
      setShowLocation(profileStore.profilSettings.showLocation);
      setShowAge(profileStore.profilSettings.showAge);
    }
  }, [profileStore.isLoading, profileStore.profilSettings]);

  const dateLastActive = new Date(parseInt(profileStore.lastActive));

  return (
    <div className="profil__detailsContainer">
      <div className="profil__hello">
        <div>
          {showFirstName && profileStore.firstName}
          {showLastName && ` ${profileStore.lastName}`}
        </div>
        <div className="profil__username">@{profileStore.userName}</div>
        <div className="profil__username">
          {showGender && !!profileStore.gender && `${profileStore.gender}`}
          {showAge && !!profileStore.age && ` ${profileStore.age}`}
          {showSexualOrientation &&
            !!profileStore.orientation &&
            ` ${profileStore.orientation}`}
          {showLocation &&
            !!profileStore.location &&
            `, ${profileStore.location}`}
        </div>
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
