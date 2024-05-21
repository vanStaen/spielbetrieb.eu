import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import eventPlaceholder from "../../../../../img/artworks/eventPlaceholder.jpg";

import "./EventPageArtwork.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

export const EventPageArtwork = observer((props) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        if (pageStore.pictureSelected > 0) {
          pageStore.setPictureSelected(pageStore.pictureSelected - 1);
        }
      } else if (isLeftSwipe) {
        if (pageStore.pictureSelected < pageStore.picturesUrls.length - 1) {
          pageStore.setPictureSelected(pageStore.pictureSelected + 1);
        }
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

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

  return pageStore.picturesUrls ? (
    <div className="eventpage__artworkCol">
      <div
        className="eventpage__artworkContainer"
        ref={props.ref1}
        onClick={() => {
          pageStore.setShowOverlayGallery(true);
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd()}
      >
        <img
          src={pageStore.picturesUrls[pageStore.pictureSelected]}
          className="eventpage__artwork"
        />
      </div>
      {pageStore.picturesUrls?.length > 1 && (
        <div className="carouselPoints">{points}</div>
      )}
    </div>
  ) : props.event.externalPicture ? (
    <div className="eventpage__artworkCol">
      <div
        className="eventpage__artworkContainer"
        onClick={() => {
          pageStore.setPicturesUrls([props.event.externalPicture]);
          pageStore.setShowOverlayGallery(true);
        }}
        ref={props.ref1}
      >
        <img src={props.event.externalPicture} className="eventpage__artwork" />
      </div>
    </div>
  ) : (
    <div className="eventpage__artworkCol">
      <div className="eventpage__artworkContainer" ref={props.ref1}>
        <img src={eventPlaceholder} className="eventpage__artwork" />
      </div>
    </div>
  );
});
