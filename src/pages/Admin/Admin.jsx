import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Segmented, FloatButton } from "antd";
import { observer } from "mobx-react";
import {
  PieChartOutlined,
  ReadOutlined,
  ShopOutlined,
  UserOutlined,
  CalendarOutlined,
  PicLeftOutlined,
  FontSizeOutlined,
  CloseOutlined,
  DatabaseOutlined,
  AuditOutlined,
  BugOutlined,
} from "@ant-design/icons";

import { AdminNewsletter } from "./AdminNewsletter/AdminNewsletter";
import { AdminRessources } from "./AdminRessources/AdminRessources";
import { AdminUsers } from "./AdminUsers/AdminUsers";
import { AdminPartners } from "./AdminPartners/AdminPartners";
import { AdminData } from "./AdminData/AdminData";
import { AdminContent } from "./AdminContent/AdminContent";
import { AdminEvents } from "./AdminEvents/AdminEvents";
import { AdminTranslations } from "./AdminTranslations/AdminTranslations";
import { isMobileCheck } from "../../helpers/dev/checkMobileTablet";
import { authStore } from "../../store/authStore/authStore";
import { userStore } from "../../store/userStore/userStore";
import { pageStore } from "../../store/pageStore/pageStore";
import { adminStore } from "../../store/adminStore/adminStore";
import { AdminBugs } from "./AdminBugs/AdminBugs";
import { GalleryOverlay } from "../../components/GalleryOverlay/GalleryOverlay";

import "./Admin.less";
export const Admin = observer(() => {
  const segmentedChangeHandler = (e) => {
    adminStore.setSelectedPage(e);
  };

  useEffect(() => {
    if (!adminStore.selectedPage && userStore.adminRoles) {
      adminStore.setSelectedPage(userStore.adminRoles[0]);
    }
  }, [userStore.adminRoles]);

  useEffect(() => {
    const footer = document.getElementById("app__footer");
    footer.style.display = "none";
    return () => {
      footer.style.display = "block";
    };
  }, []);

  const isMobile = isMobileCheck();

  const renderSwitch = (adminPage) => {
    switch (adminPage) {
      case "newsletter":
        return <AdminNewsletter />;
      case "events":
        return <AdminEvents />;
      case "users":
        return <AdminUsers />;
      case "partners":
        return <AdminPartners />;
      case "content":
        return <AdminContent />;
      case "analytics":
        return "analytics";
      case "translation":
        return <AdminTranslations />;
      case "data":
        return <AdminData />;
      case "ressources":
        return <AdminRessources />;
      case "bugs":
        return <AdminBugs />;
      default:
        return "Error";
    }
  };

  const Options = () => {
    const options = [];
    const roles = userStore.adminRoles || null;
    if (roles.includes("events")) {
      options.push({
        label: !isMobile && "Events",
        value: "events",
        icon: <CalendarOutlined />,
      });
    }
    if (roles.includes("partners")) {
      options.push({
        label: !isMobile && "Partners",
        value: "partners",
        icon: <ShopOutlined />,
      });
    }
    if (roles.includes("users")) {
      options.push({
        label: !isMobile && "Users",
        value: "users",
        icon: <UserOutlined />,
      });
    }
    if (roles.includes("content")) {
      options.push({
        label: !isMobile && "Content",
        value: "content",
        icon: <ReadOutlined />,
      });
    }
    if (roles.includes("newsletter")) {
      options.push({
        label: !isMobile && "Newsletter",
        value: "newsletter",
        icon: <PicLeftOutlined />,
      });
    }
    if (roles.includes("analytics")) {
      options.push({
        label: !isMobile && "Analytics",
        value: "analytics",
        icon: <PieChartOutlined />,
        disabled: true,
      });
    }
    if (roles.includes("data")) {
      options.push({
        label: !isMobile && "Data",
        value: "data",
        icon: <DatabaseOutlined />,
      });
    }
    if (roles.includes("translation")) {
      options.push({
        label: !isMobile && "Translation",
        value: "translation",
        icon: <FontSizeOutlined />,
      });
    }
    if (roles.includes("bugs")) {
      options.push({
        label: !isMobile && "Bugs",
        value: "bugs",
        icon: <BugOutlined />,
      });
    }
    if (roles.includes("ressources")) {
      options.push({
        label: !isMobile && "Ressources",
        value: "ressources",
        icon: <AuditOutlined />,
      });
    }
    return options;
  };

  return (
    <>
      {pageStore.showOverlayGallery && <GalleryOverlay />}
      <div className="backgroundAdmin"></div>
      <div className="admin__container">
        {!isMobile && (
          <Link to="../" relative="path">
            <Tooltip title="Back to main page" placement="left">
              <CloseOutlined className="admin__closeLogo" />
            </Tooltip>
          </Link>
        )}
        {userStore.isAdmin ? (
          <div className="admin__sectionContainer">
            <Segmented
              size={isMobile && "large"}
              style={{ position: "relative", zIndex: "10", marginBottom: 10 }}
              onChange={segmentedChangeHandler}
              value={adminStore.selectedPage}
              options={Options()}
            />
            <div className="admin__title">
              {renderSwitch(adminStore.selectedPage)}
            </div>
            <FloatButton.BackTop
              visibilityHeight={75}
              style={{
                right: 48,
              }}
            />
          </div>
        ) : (
          <div className="admin__centered">
            {authStore.hasAccess ? (
              <div className="admin__title">You dont have admin rights</div>
            ) : (
              <div className="admin__title">You are not logged in</div>
            )}
          </div>
        )}
      </div>
    </>
  );
});
