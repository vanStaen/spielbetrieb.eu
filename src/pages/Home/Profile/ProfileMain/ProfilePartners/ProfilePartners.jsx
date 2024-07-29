import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { userStore } from "../../../../../store/userStore/userStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { CreatePartnerForm } from "./CreatePartnerForm/CreatePartnerForm";
import { PartnerCard } from "./PartnerCard/PartnerCard";

import "./ProfilePartners.less";

// TODO1: make responsive

export const ProfilePartners = observer((props) => {
  const [showPartnersModal, setShowPartnersModal] = useState(false);
  const { t } = useTranslation();
  const { thisIsMine, numberOfPartners } = props;

  const partnerCards = profileStore.partners.map((partner) => {
    if (!partner.pending || thisIsMine || userStore.isAdmin) {
      return <PartnerCard key={`partnerCard${partner.id}`} partner={partner} />;
    } else {
      return null;
    }
  });
  const partnerCardsCleaned = partnerCards?.filter((partner) => partner);

  return (
    <>
      {thisIsMine && (
        <CreatePartnerForm
          showModal={showPartnersModal}
          setShowModal={setShowPartnersModal}
        />
      )}
      {!!(thisIsMine || partnerCardsCleaned?.length) && (
        <div className="profilePartners__container">
          <ProfileMainTitle
            title={t("profile.partners")}
            addPartner={true}
            showEdit={showPartnersModal}
            setShowEdit={setShowPartnersModal}
            thisIsMine={thisIsMine}
            value={numberOfPartners}
          />
          <div className="profilePartners__main">
            {numberOfPartners ? (
              partnerCardsCleaned
            ) : (
              <div className="profilePartners__empty">
                {t("profile.nothingYet")}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});
