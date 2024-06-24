import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { profileStore } from "../../../../../store/profileStore/profileStore";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { EventCard } from "../../../Spielplan/EventCard/EventCard";
import { nameParser } from "../../../../../helpers/dev/nameParser";

import "./ProfileEvents.less";

export const ProfileEvents = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="profileEvents__container">
      <ProfileMainTitle
        title={t("profile.events")}
        value={profileStore.events?.length}
        addEvent={true}
      />
      <div className="profileDescription__main">
        {profileStore.events.length ? (
          profileStore.events.map((event) => {
            const eventTags = event.eventTags.map((tagId) => {
              return {
                name: nameParser(
                  spielplanStore.tags.filter(
                    (tag) => parseInt(tag._id) === tagId,
                  )[0]?.name,
                  pageStore.selectedLanguage?.toLowerCase(),
                ),
                id: tagId,
              };
            });
            const eventType = spielplanStore.eventtypes.filter(
              (et) => parseInt(et._id) === event.eventtype,
            )[0];
            eventTags.splice(0, 0, {
              name: nameParser(
                eventType?.name,
                pageStore.selectedLanguage?.toLowerCase(),
              ),
              id: eventType?._id,
            });

            return (
              <EventCard
                key={event._id}
                event={event}
                eventUser={{ user: profileStore.user, _id: profileStore._id }}
                profileCard={true}
                tags={eventTags}
              />
            );
          })
        ) : (
          <div className="profileDescription__empty">
            {t("profile.nothingYet")}
          </div>
        )}
      </div>
    </div>
  );
});
