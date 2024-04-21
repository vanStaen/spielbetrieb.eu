import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Segmented } from "antd";
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
} from "@ant-design/icons";

import { AdminNewsletter } from "./AdminNewsletter/AdminNewsletter";
import { AdminRessources } from "./AdminRessources/AdminRessources";
import { AdminUsers } from "./AdminUsers/AdminUsers";
import { AdminData } from "./AdminData/AdminData";
import { AdminContent } from "./AdminContent/AdminContent";
import { AdminEvents } from "./AdminEvents/AdminEvents";
import { AdminTranslations } from "./AdminTranslations/AdminTranslations";
import { isMobileCheck } from "../../helpers/dev/checkMobileTablet";
import { authStore } from "../../store/authStore/authStore";
import { userStore } from "../../store/userStore/userStore";
import { adminStore } from "../../store/adminStore/adminStore";

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
        return "partners";
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
      default:
        return "Error";
    }
  };

  return (
    <>
      <div className="background"></div>
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
              options={[
                {
                  label: !isMobile && "Newsletter",
                  value: "newsletter",
                  disabled: !userStore.adminRoles?.includes("newsletter"),
                  icon: <PicLeftOutlined />,
                },
                {
                  label: !isMobile && "Events",
                  value: "events",
                  disabled: !userStore.adminRoles?.includes("events"),
                  icon: <CalendarOutlined />,
                },
                {
                  label: !isMobile && "Users",
                  value: "users",
                  disabled: !userStore.adminRoles?.includes("users"),
                  icon: <UserOutlined />,
                },
                {
                  label: !isMobile && "Partners",
                  value: "partners",
                  // disabled: !userStore.adminRoles?.includes('partners'),
                  disabled: true,
                  icon: <ShopOutlined />,
                },
                {
                  label: !isMobile && "Content",
                  value: "content",
                  disabled: !userStore.adminRoles?.includes("content"),
                  icon: <ReadOutlined />,
                },
                {
                  label: !isMobile && "Analytics",
                  value: "analytics",
                  // disabled: !userStore.adminRoles?.includes('analytics'),
                  disabled: true,
                  icon: <PieChartOutlined />,
                },
                {
                  label: !isMobile && "Translations",
                  value: "translation",
                  disabled: !userStore.adminRoles?.includes("translation"),
                  icon: <FontSizeOutlined />,
                },
                {
                  label: !isMobile && "Data",
                  value: "data",
                  disabled: !userStore.adminRoles?.includes("data"),
                  icon: <DatabaseOutlined />,
                },
                {
                  label: !isMobile && "Ressources",
                  value: "ressources",
                  // disabled: !userStore.adminRoles?.includes('ressources'),
                  disabled: false,
                  icon: <AuditOutlined />,
                },
              ]}
            />
            <div className="admin__title">
              {renderSwitch(adminStore.selectedPage)}
            </div>
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
