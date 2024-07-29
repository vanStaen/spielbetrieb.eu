import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { profileStore } from "../../../../../store/profileStore/profileStore";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { userStore } from "../../../../../store/userStore/userStore";
import { partnerStore } from "../../../../../store/partnerStore/partnerStore";
import { EventCard } from "../../../Spielplan/EventCard/EventCard";
import { nameParser } from "../../../../../helpers/dev/nameParser";

import "./ProfileEvents.less";

// TODO: translation

export const ProfileEvents = observer((props) => {
  const { t } = useTranslation();
  const { thisIsMine, isPartner, numberOfEvents } = props;
  const events = isPartner ? partnerStore.events : profileStore.events;
  const [showEventCount, setShowEventsCount] = useState(3);

  const eventCards = events?.map((event, index) => {
    if (
      !thisIsMine &&
      !userStore.isAdmin &&
      (event.isPrivate || !event.validated)
    ) {
      return null;
    }

    if (index >= showEventCount) {
      return null;
    }

    const eventTags = event.eventTags.map((tagId) => {
      const tag = spielplanStore.tags.filter(
        (tag) => parseInt(tag.id) === tagId,
      )[0];
      return {
        name: `${nameParser(
          tag?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        )}${!tag.validated ? ` (${t("general.pendingReview")})` : ""}`,
        id: tagId,
        validated: tag.validated,
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
      validated: true,
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
  });

  const eventCardsCleaned = eventCards?.filter((partner) => partner);

  return (
    <div className="profileEvents__container">
      <ProfileMainTitle
        title={t("profile.events")}
        value={numberOfEvents}
        addEvent={true}
        thisIsMine={thisIsMine}
      />
      <div className="profileEvents__main">
        {numberOfEvents ? (
          <>
            <div>{eventCardsCleaned}</div>
            <div className="profileEvents__showMore">
              {events.length >= showEventCount && (
                <span
                  className="profileEvents__showMoreAction"
                  onClick={() => setShowEventsCount(showEventCount + 3)}
                >
                  [{t("profile.showMoreEvent")}]
                </span>
              )}
              {events.length >= showEventCount && (
                <span
                  className="profileEvents__showMoreAction"
                  onClick={() => setShowEventsCount(events.length)}
                >
                  [{t("profile.showAllEvent")}]
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="profileEvents__empty">{t("profile.nothingYet")}</div>
        )}
      </div>
    </div>
  );
});
