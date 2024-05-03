import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { getPublicDarks } from "./getPublicDarks";
import { pageStore } from "../../../store/pageStore/pageStore";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinnner";

import "./Dark.less";

export const Dark = observer(() => {
  const [darks, setDarks] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(0);
  const { t } = useTranslation();

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
      setLoading(udpateLoadingStatus);
    });
  };

  useEffect(() => {
    fetchAllDarks();
  }, []);

  return (
    <div className="dark__container">
      {/* <div
        className={`dark__intro ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
      >
        <div className="dark__introTitle">{t("dark.darkIs")}</div>

        {t("dark.darkShortDesc")}
  </div> */}

      <div className="dark__subContainer">
        <iframe
          className="dark__iframe"
          src={darks[selectedIssue]?.link}
          seamless="seamless"
          allowfullscreen="true"
        ></iframe>

        <div
          className={`dark__allIssues ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
        >
          {t("dark.allIssues")}
        </div>

        {darks.map((dark, index) => {
          return (
            <div key={index} className="dark__issue">
              <div className={`dark__issueContainer`}>
                {/* <a href={dark.link} target="_blank" rel="noreferrer"></a> */}
                {loading[index] ? (
                  <div className="dark__loader">
                    <CustomSpinner />{" "}
                  </div>
                ) : (
                  <img
                    onClick={() => setSelectedIssue(index)}
                    className={`dark__cover  ${index === selectedIssue ? "halo" : "greyed"}`}
                    src={images[index]}
                  />
                )}
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
