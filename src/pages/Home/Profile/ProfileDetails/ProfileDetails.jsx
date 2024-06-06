import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { profileStore } from "../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { nameParser } from "../../../../helpers/dev/nameParser";

import "./ProfileDetails.less";

const rounding = Math.floor; // default is Math.round
dayjs.extend(relativeTime, {
  rounding,
});

dayjs.extend(relativeTime);

export const ProfileDetails = observer(() => {
  const { t } = useTranslation();
  const [showLastSeenOnline, setShowLastSeenOnline] = useState(false);
  const [showLastName, setShowLastName] = useState(false);
  const [showFirstName, setShowFirstName] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showSexualOrientation, setShowSexualOrientation] = useState(false);

  const genderText =
    profileStore.genderId &&
    nameParser(
      pageStore.genders.find(
        (gender) => parseInt(gender._id) === profileStore.genderId,
      ).name,
      pageStore.selectedLanguage,
    );

  const orientationText =
    profileStore.orientationId &&
    nameParser(
      pageStore.orientations.find(
        (orientation) =>
          parseInt(orientation._id) === profileStore.orientationId,
      ).name,
      pageStore.selectedLanguage,
    );
  const detailsArray = [];

  const ageFromBirthday = dayjs(profileStore.birthday).fromNow(true);

  if (showGender && !!profileStore.genderId) {
    detailsArray.push(genderText);
  }
  if (showAge && !!profileStore.birthday) {
    detailsArray.push(ageFromBirthday);
  }
  if (showSexualOrientation && !!profileStore.orientationId) {
    detailsArray.push(orientationText);
  }
  if (showLocation && !!profileStore.location) {
    detailsArray.push(profileStore.location);
  }

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
        <div className="profil__username">@{profileStore.userName}</div>
        <div>
          {showFirstName && profileStore.firstName}
          {showLastName && ` ${profileStore.lastName}`}
        </div>
        <div className="profil__details">{detailsArray.join(" - ")}</div>
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
