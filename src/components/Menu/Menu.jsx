import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Avatar, Badge, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LockOutlined,
  UnlockOutlined,
  SettingOutlined,
  UserOutlined,
  PieChartOutlined,
  LoadingOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { userStore } from "../../store/userStore/userStore";
import { pageStore } from "../../store/pageStore/pageStore";
import { authStore } from "../../store/authStore/authStore";
import { AddToHomeScreen } from "../AddToHomeScreen/AddToHomeScreen";
import { getPictureUrl } from "../../helpers/picture/getPictureUrl";
import { ConditionalWrapper } from "../../helpers/dev/ConditionalWrapper";

import "./Menu.less";

// TODO: translation

export const Menu = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showOpenLock, setShowOpenLock] = useState(false);
  const [avatarPic, setAvatarPic] = useState(null);
  const [userAvatarPic, setUserAvatarPic] = useState(null);
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);
  const [partnersAvatarPics, setPartnersAvatarPics] = useState([]);
  const [partnersAvatarLoading, setPartnersAvatarLoading] = useState([]);

  // TODO1: settings and notifications for partner as user

  const getAvatarUrl = async (path, bucket) => {
    try {
      if (path) {
        setAvatarIsLoading(true);
        const url = await getPictureUrl(path, bucket);
        const isloaded = new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = url;
          loadImg.onload = () => resolve(url);
          loadImg.onerror = (err) => reject(err);
        });
        await isloaded;
        setAvatarIsLoading(false);
        setAvatarPic(url);
        if (bucket === "users") {
          setUserAvatarPic(url);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getPartnersAvatarUrls = async () => {
    const urls = await Promise.all(
      userStore.partners.map((partner) => {
        if (!partner.avatar) {
          return null;
        }
        const bucket = partner.pending ? "temp" : "partners";
        return getPictureUrl(`${partner.avatar}_t`, bucket);
      }),
    );
    setPartnersAvatarPics(urls);
    let index = 0;
    for (const url of urls) {
      try {
        const isloaded = new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = urls;
          loadImg.onload = () => resolve(url);
          loadImg.onerror = (err) => reject(err);
        });
        await isloaded;
        partnersAvatarLoading[index] = true;
        setPartnersAvatarLoading(partnersAvatarLoading);
      } catch (e) {
        console.error(e);
      }
      index = index++;
    }
  };

  useEffect(() => {
    setAvatarPic(null);
    if (userStore.partnerSelected) {
      const bucket = userStore.partnerSelected.pending ? "temp" : "partners";
      getAvatarUrl(userStore.partnerSelected.avatar, bucket);
    } else {
      getAvatarUrl(userStore.avatar, "users");
    }
  }, [userStore.avatar, userStore.partnerSelected]);

  useEffect(() => {
    userStore.fetchUserPartners();
  }, [userStore.id]);

  useEffect(() => {
    userStore.partners?.length && getPartnersAvatarUrls();
  }, [userStore.partners]);

  useEffect(() => {
    if (pageStore.showMenu) {
      // const elementBackground = document.getElementById("silentBackground");
      const elementContainer = document.getElementById("menuContainer");
      // elementBackground.style.backdropFilter = 'blur(7px) grayscale(25%)';
      elementContainer.style.opacity = 1;
    }
  });

  const handleClickLogOut = () => {
    authStore.logout();
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  const handleHideMenu = () => {
    const elementBackground = document.getElementById("silentBackground");
    const elementContainer = document.getElementById("menuContainer");
    elementBackground.style.backdropFilter = "blur(0px) grayscale(0%)";
    elementContainer.style.opacity = 0;
    setTimeout(function () {
      pageStore.setShowMenu(false);
    }, 300);
  };

  const avatarClickhandle = () => {
    if (authStore.hasAccess) {
      if (pageStore.showMenu === true) {
        handleHideMenu();
      } else {
        pageStore.setShowMenu(true);
      }
      pageStore.setShowMenuMobile(false);
    } else {
      navigate("/login");
    }
  };

  const profileClickHandler = () => {
    handleHideMenu();
    userStore.setIsLoading(true);
    navigate("/profile");
  };

  const switchAccountHandler = (partner) => {
    userStore.setIsLoading(true);
    userStore.setPartnerSelected(partner);
    navigate("/profile");
  };

  const settingsClickHandler = () => {
    userStore.setIsLoading(true);
    handleHideMenu();
    navigate("/settings");
  };

  const notificationsClickHandler = () => {
    handleHideMenu();
    navigate("/notifications");
  };

  const partnerMenuElements = () => {
    return userStore.partners.map((partner, index) => {
      if (userStore.partnerSelected === partner) {
        return null;
      }
      return (
        <div
          className="link menu__element menu__elementPartner"
          onClick={() => switchAccountHandler(partner)}
          key={`partnerMenuElement${index}`}
        >
          {partnersAvatarLoading[index] ? (
            <Spin
              className="menu__spinner"
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 16, color: "#e1cfbb", top: "-4px" }}
                  spin
                />
              }
            />
          ) : (
            <img
              src={partnersAvatarPics[index]}
              className="menu__elementPartnerImg"
            />
          )}

          <span className="menu__elementPartnerText">{partner.name}</span>
        </div>
      );
    });
  };

  const userMenuElement = (
    <div
      className="link menu__element menu__elementPartner"
      onClick={() => switchAccountHandler(null)}
      key={`partnerMenuElementUser`}
    >
      <img src={userAvatarPic} className="menu__elementPartnerImg" />
      <span className="menu__elementPartnerText">{userStore.userName}</span>
    </div>
  );

  return (
    <>
      <div className={`menu__containerAvatar`} onClick={avatarClickhandle}>
        <Badge
          size="small"
          count={pageStore.unseenNotificationsCount}
          offset={[-45, 45]}
        >
          <Avatar
            shape="square"
            src={
              !avatarIsLoading ? (
                avatarPic ? (
                  <img src={avatarPic} />
                ) : (
                  <UserOutlined className="menu__icon" />
                )
              ) : null
            }
            icon={
              (userStore.isLoading || avatarIsLoading) && (
                <Spin
                  className="menu__spinner"
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "#e1cfbb", top: "-4px" }}
                      spin
                    />
                  }
                />
              )
            }
            className="menu__avatar"
            size={48}
          />
        </Badge>
      </div>
      {pageStore.showMenu && (
        <>
          <div
            className="menu__silentBackground"
            id="silentBackground"
            onClick={handleHideMenu}
          ></div>
          <div
            className={`menu__container ${pageStore.selectedTheme === "light" ? "lightColorTheme__Menu" : "darkColorTheme__Menu"}`}
            id="menuContainer"
          >
            <div className="link menu__element" onClick={profileClickHandler}>
              <UserOutlined style={{ position: "relative", bottom: "-2px" }} />
              &nbsp; Profile
            </div>
            <div className="menu__spacer"></div>
            <div className="link menu__element" onClick={settingsClickHandler}>
              <SettingOutlined
                style={{ position: "relative", bottom: "-2px" }}
              />
              &nbsp; Settings
            </div>
            <div className="menu__spacer"></div>
            <div
              className={
                pageStore.notificationsCount === 0
                  ? "menu__elementDisabled"
                  : "link menu__element"
              }
              onClick={notificationsClickHandler}
            >
              <ConditionalWrapper
                condition={pageStore.unseenNotificationsCount}
                wrap={(children) => (
                  <Badge dot className="menu__badgeDot">
                    {children}
                  </Badge>
                )}
              >
                <NotificationOutlined
                  style={{ position: "relative", bottom: "-2px" }}
                />
              </ConditionalWrapper>
              &nbsp; Notifications
            </div>

            {/* Partner management */}
            {!!userStore.partners?.length && (
              <>
                <div className="menu__whiteline"></div>
                {userStore.partnerSelected && userMenuElement}
                {partnerMenuElements()}
              </>
            )}

            <div className="menu__whiteline"></div>
            <div key="addtohomescreen">
              <AddToHomeScreen />
            </div>
            <div
              className="link menu__element"
              onMouseEnter={() => setShowOpenLock(true)}
              onMouseLeave={() => setShowOpenLock(false)}
              onClick={handleClickLogOut}
            >
              {showOpenLock ? (
                <UnlockOutlined
                  style={{ position: "relative", bottom: "-2px" }}
                />
              ) : (
                <LockOutlined
                  style={{ position: "relative", bottom: "-2px" }}
                />
              )}
              &nbsp; {t("general.logout")}
            </div>
            {userStore.isAdmin && (
              <>
                <div className="menu__whiteline"></div>
                <div className="link menu__element">
                  <Link className="link menu__link" to="/admin/">
                    <PieChartOutlined
                      style={{ position: "relative", bottom: "-2px" }}
                    />
                    &nbsp; Admin
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
});
