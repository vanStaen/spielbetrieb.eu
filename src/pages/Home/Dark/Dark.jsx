import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { getPublicDarks } from "./getPublicDarks";
import { pageStore } from "../../../store/pageStore/pageStore";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinnner";

import "./Dark.less";

export const Dark = observer(() => {
  const [darks, setDarks] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchAllDarks = async () => {
    const res = await getPublicDarks();
    setDarks(res);
    const imageLink = res.map((dark) => `${dark.link}files/shot.jpg`);
    const loadingStatus = res.map((_) => true);
    setImages(imageLink);
    setLoading(loadingStatus);
    loadImageDark(imageLink);
  };

  const loadImageDark = (imageLink) => {
    imageLink.map(async (link, index) => {
      const isloaded = new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = link;
        loadImg.onload = () => resolve(link);
        loadImg.onerror = (err) => reject(err);
      });
      await isloaded;
      const udpateLoadingStatus = loading;
      udpateLoadingStatus[index] = false;
      console.log(udpateLoadingStatus);
      setLoading(udpateLoadingStatus);
    });
  };

  useEffect(() => {
    fetchAllDarks();
  }, []);

  return (
    <div className="dark__container">
      <div
        className={`dark__intro ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
      >
        <div className="dark__introTitle">DARK is ...</div>
        ... a lifestyle magazin made in Berlin, themed around BDSM fetish and
        kink. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </div>

      <div className="dark__subContainer">
        {darks.map((dark, index) => {
          return (
            <div key={index} className="dark__issue">
              <div className="dark__issueContainer">
                <a href={dark.link} target="_blank" rel="noreferrer">
                  {loading[index] ? (
                    <div className="dark__loader">
                      <CustomSpinner />{" "}
                    </div>
                  ) : (
                    <img className="dark__cover" src={images[index]} />
                  )}
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
