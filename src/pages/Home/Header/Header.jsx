import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

import { pageStore } from "../../../store/pageStore/pageStore";
import { Menu } from "../../../components/Menu/Menu";
import { QuickActions } from "../../../components/QuickActions/QuickActions";
import { HeaderElement } from "./HeaderElement/HeaderElement";
import { HeaderMenuMobile } from "./HeaderMenuMobile/HeaderMenuMobile";

import SpielbetriebLogo from "../../../img/logos/spielbetriebLogo.png";
import SpielbetriebLogoInverted from "../../../img/logos/spielbetriebLogoInverted.png";

import "./Header.less";

export const Header = observer((props) => {
  const { selected } = props;

  return (
    <div
      className={`header__container ${pageStore.selectedTheme === "light" ? "lightColorTheme__Header" : "darkColorTheme__Header"}`}
    >
      <Link to="/">
        <img
          src={pageStore.selectedTheme === "light" ? SpielbetriebLogo : SpielbetriebLogoInverted}
          id="spielbetriebLogo"
          className="header__logo"
        />
      </Link>
      <div
        className="header__menuMobile"
        onClick={() => {
          pageStore.setShowMenuMobile(!pageStore.showMenuMobile);
          pageStore.setShowMenu(false);
        }}
      >
        <MenuOutlined />
      </div>
      {pageStore.showMenuMobile && <HeaderMenuMobile selected={selected} />}
      <div className="header__headerElementContainer">
        <HeaderElement
          title="Spielplan"
          page="spielplan"
          selected={selected === "spielplan"}
        />
        <HeaderElement
          title="Dark Magazin"
          disabled
          page="dark"
          selected={selected === "dark"}
        />
        <HeaderElement
          title="Shop"
          disabled
          page="shop"
          selected={selected === "shop"}
        />
        <HeaderElement
          title="Partners"
          disabled
          page="partner"
          selected={selected === "partner"}
        />
      </div>
      <Menu />
      <div className="header__actions">
        <QuickActions />
      </div>
    </div>
  );
});
