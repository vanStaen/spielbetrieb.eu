import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { profileStore } from "../../../../../store/profileStore/profileStore";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { partnerStore } from "../../../../../store/partnerStore/partnerStore";
import { EventCard } from "../../../Spielplan/EventCard/EventCard";
import { nameParser } from "../../../../../helpers/dev/nameParser";

import "./ProfileEvents.less";

// TODO: hide if !thisIsMine && (isPrivate || isDraft)

export const ProfileEvents = observer((props) => {
  const { t } = useTranslation();
  const { thisIsMine, isPartner } = props;
  const events = isPartner ? partnerStore.events : profileStore.events;

  return (
    <div className="profileEvents__container">
      <ProfileMainTitle
        title={t("profile.events")}
        value={events?.length}
        addEvent={true}
        thisIsMine={thisIsMine}
      />
      <div className="profileDescription__main">
        {events?.length ? (
          events.map((event) => {
            const eventTags = event.eventTags.map((tagId) => {
              return {
                name: nameParser(
                  spielplanStore.tags.filter(
                    (tag) => parseInt(tag.id) === tagId,
                  )[0]?.name,
                  pageStore.selectedLanguage?.toLowerCase(),
                ),
                id: tagId,
              };
            });
            const eventType = spielplanStore.eventtypes.filter(
              (et) => parseInt(et.id) === event.eventtype,
            )[0];
            eventTags.splice(0, 0, {
              name: nameParser(
                eventType?.name,
                pageStore.selectedLanguage?.toLowerCase(),
              ),
              id: eventType?.id,
            });

            return (
              <EventCard
                key={event.id}
                event={event}
                eventUser={{ user: profileStore.user, id: profileStore.id }}
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
