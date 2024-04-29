import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { getPublicDarks } from "./getPublicDarks";
import { pageStore } from "../../../store/pageStore/pageStore";

import "./Dark.less";

export const Dark = observer(() => {
  const [darks, setDarks] = useState([]);

  const fetchAllDarks = async () => {
    const res = await getPublicDarks();
    setDarks(res);
  };

  useEffect(() => {
    fetchAllDarks();
  }, []);

  return (
    <div className="dark__container">
      <div
        className={`dark__intro ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
      >
        Dark is: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>

      <div className="dark__subContainer">
        {darks.map((dark, index) => {
          return (
            <div key={index} className="dark__issue">
              <div className="dark__issueContainer">
                <a href={dark.link} target="_blank" rel="noreferrer">
                  <img
                    className="dark__cover"
                    src={`${dark.link}files/shot.jpg`}
                  />
                </a>
                <div className="dark__issueInfo">
                  {dark.description} • #{dark.number}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

/*
<iframe
  className="dark__iframe"
  src={dark.link}
  seamless="seamless"
  scrolling="no"
  frameBorder="0"
  // eslint-disable-next-line react/no-unknown-property
  allowtransparency="true"
  allowfullscreen="true"
></iframe>
*/
