import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { pageStore } from "../../../../../store/pageStore/pageStore";

import "./EventPageArtwork.less";

export const EventPageArtwork = observer((props) => {
  useEffect(() => {
    const allPoints = document.getElementsByClassName("point");
    allPoints.map = Array.prototype.map;
    allPoints.map((point) => {
      point.style.width = "10px";
      point.style.backgroundColor = "rgba(255,255,255,.75)";
      return null;
    });
    const selectedPoint = document.getElementById(
      `point${pageStore.pictureSelected}`,
    );
    if (selectedPoint) {
      selectedPoint.style.width = "30px";
      selectedPoint.style.backgroundColor = "rgba(255,255,255,1)";
    }
  }, [pageStore.pictureSelected]);

  const points = pageStore.picturesUrls?.map((_, index) => {
    return (
      <div
        id={`point${index}`}
        key={`point${index}`}
        className={`point${index} point`}
        onClick={() => pageStore.setPictureSelected(index)}
      ></div>
    );
  });

  return (
    <div className="eventpage__artworkCol">
      <div
        className="eventpage__artworkContainer"
        ref={props.ref1}
        onClick={() => {
          pageStore.setShowOverlayGallery(true);
        }}
      >
        <img
          src={
            pageStore.picturesUrls &&
            pageStore.picturesUrls[pageStore.pictureSelected]
          }
          className="eventpage__artwork"
        />
      </div>
      <div className="carouselPoints">{points}</div>
    </div>
  );
});
