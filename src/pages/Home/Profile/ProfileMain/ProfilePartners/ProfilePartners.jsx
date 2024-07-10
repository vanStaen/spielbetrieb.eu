import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { userStore } from "../../../../../store/userStore/userStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { CreatePartnerForm } from "./CreatePartnerForm/CreatePartnerForm";
import { PartnerCard } from "./PartnerCard/PartnerCard";

import "./ProfilePartners.less";

export const ProfilePartners = observer(() => {
  const [showPartnersModal, setShowPartnersModal] = useState(false);
  const { t } = useTranslation();
  const thisIsMe = userStore.id === profileStore.id;

  const partnerCards = profileStore.partners.map((partner) => {
    if (!partner.pending || thisIsMe || userStore.isAdmin) {
      return <PartnerCard partner={partner} />
    } else {
      return null;
    }
  })
  const partnerCardsCleaned = partnerCards?.filter((partner) => partner);

  return (
    <>
      {thisIsMe &&
        <CreatePartnerForm
          showModal={showPartnersModal}
          setShowModal={setShowPartnersModal}
        />}
      {!!(thisIsMe || partnerCardsCleaned?.length) &&
        <div className="profilePartners__container">
          <ProfileMainTitle
            title={t("profile.partners")}
            addPartner={true}
            showEdit={showPartnersModal}
            setShowEdit={setShowPartnersModal}
          />
          <div className="profilePartners__main">
            {
              profileStore.partners?.length ? (
                partnerCardsCleaned
              ) : (
                <div className="profilePartners__empty">
                  {t("profile.nothingYet")}
                </div>
              )
            }
          </div>
        </div>
      }
    </>
  );
});
