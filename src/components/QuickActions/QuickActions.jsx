import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
  LinkOutlined,
  InstagramOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

import { pageStore } from "../../store/pageStore/pageStore";

import "./QuickActions.less";

export const QuickActions = observer(() => {
  return (
    <div className="quickActions__container">
      <div
        className={`quickActions__link ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
      >
        <Tooltip title="Instagram" placement="bottom">
          <a
            href="https://www.instagram.com/spiel_betrieb/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramOutlined />
          </a>
        </Tooltip>
      </div>
      <div
        className={`quickActions__link ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
      >
        <Tooltip title="Linktree" placement="bottom">
          <a
            href="https://linktr.ee/spielbetrieb"
            target="_blank"
            rel="noreferrer"
          >
            <LinkOutlined />
          </a>
        </Tooltip>
      </div>
      <div
        className={`quickActions__linkDisabled ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
      >
        <ShoppingCartOutlined style={{ fontSize: "24px" }} />
      </div>
      {/*
            <Link className="link" to="/basket/">
                <div className={`quickActions__link ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__SubText' : 'darkColorTheme__SubText'}`} >
                    <ShoppingCartOutlined style={{fontSize: '24px'}}/>
                </div>
            </Link>
             */}
    </div>
  );
});
