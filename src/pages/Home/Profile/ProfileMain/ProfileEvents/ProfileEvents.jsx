import React from "react";
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

// TODO: hide if !thisIsMine && (isPrivate || isDraft)

export const ProfileEvents = observer((props) => {
  const { t } = useTranslation();
  const { thisIsMine, isPartner } = props;
  const events = isPartner ? partnerStore.events : profileStore.events;

  const eventCards = events?.map((event) => {
    if (event.validated || thisIsMine || userStore.isAdmin) {
      const eventTags = event.eventTags.map((tagId) => {
        const tag = spielplanStore.tags.filter((tag) => parseInt(tag.id) === tagId)[0];
        return {
          name: `${nameParser(tag?.name,
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
    } else {
      return null;
    }
  });

  const eventCardsCleaned = eventCards?.filter((partner) => partner);

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
          eventCardsCleaned
        ) : (
          <div className="profileDescription__empty">
            {t("profile.nothingYet")}
          </div>
        )}
      </div>
    </div>
  );
});
