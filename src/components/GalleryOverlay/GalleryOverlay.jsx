import React, { useState, useEffect, useRef } from "react";
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";

import "./GalleryOverlay.less";

export const GalleryOverlay = observer((props) => {
  const [indexImageSelected, setIndexImageSelected] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPictureLoading, setIsPictureLoading] = useState(false);
  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight,
  );
  const throttling = useRef(false);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        browsePicture(false);
      } else if (isLeftSwipe) {
        browsePicture(true);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const browsePicture = (direction) => {
    if (direction) {
      if (indexImageSelected + 1 !== props.pictures.length) {
        setIndexImageSelected(indexImageSelected + 1);
      }
    } else {
      if (indexImageSelected - 1 >= 0) {
        setIndexImageSelected(indexImageSelected - 1);
      }
    }
  };

  const loadImage = async () => {
    setImageLoaded(null);
    const isloaded = new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = props.pictures[indexImageSelected];
      loadImg.onload = () => resolve(props.pictures[indexImageSelected]);
      loadImg.onerror = (err) => reject(err);
    });
    await isloaded;
    setImageLoaded(props.pictures[indexImageSelected]);
    setIsPictureLoading(false);
  };

  useEffect(() => {
    loadImage();
  }, [indexImageSelected]);

  const mouseHoverHandler = (hover) => {
    const closeButton = document.getElementById(`closeButton`);
    if (hover) {
      closeButton.style.visibility = "hidden";
      closeButton.style.opacity = 0;
    } else {
      closeButton.style.visibility = "visible";
      closeButton.style.opacity = 1;
    }
  };

  const keyDownHandler = (event) => {
    event.preventDefault();
    const keyPressed = event.key.toLowerCase();
    const nextButton = document.getElementById(`nextButton`);
    const previousButton = document.getElementById(`previousButton`);
    if (throttling.current === false) {
      throttling.current = true;
      if (keyPressed === "arrowdown" || keyPressed === "arrowright") {
        if (nextButton) {
          nextButton.style.backgroundColor = "rgba(255,255,255,.15)";
        }
        browsePicture(true);
        setTimeout(() => {
          if (nextButton) {
            nextButton.style.backgroundColor = "rgba(255,255,255, 0)";
          }
        }, 100);
      } else if (keyPressed === "arrowup" || keyPressed === "arrowleft") {
        if (previousButton) {
          previousButton.style.backgroundColor = "rgba(255,255,255,.15)";
        }
        browsePicture(false);
        setTimeout(() => {
          if (previousButton) {
            previousButton.style.backgroundColor = "rgba(255,255,255, 0)";
          }
        }, 100);
      } else if (keyPressed === "escape") {
        props.setShowOverlay(false);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 100);
    }
  };

  const resetWindowInnerHeight = () => {
    setWindowInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    window.addEventListener("resize", resetWindowInnerHeight);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("resize", resetWindowInnerHeight);
    };
  }, [keyDownHandler, resetWindowInnerHeight]);

  return (
    <div
      className="overlay__overlay"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ height: windowInnerHeight }}
    >
      <div
        className="overlay__background"
        style={{ height: windowInnerHeight }}
        onClick={() => {
          props.setShowOverlay(false);
        }}
      ></div>
      {indexImageSelected !== 0 && (
        <div
          className="overlay__columnLeft"
          style={{ height: windowInnerHeight }}
          id="previousButton"
          onClick={() => {
            browsePicture(false);
          }}
        >
          <LeftOutlined />
        </div>
      )}
      {indexImageSelected !== props.pictures.length - 1 && (
        <div
          className="overlay__columnRight"
          style={{ height: windowInnerHeight }}
          id="nextButton"
          onMouseEnter={() => mouseHoverHandler(true)}
          onMouseLeave={() => mouseHoverHandler(false)}
          onClick={() => {
            browsePicture(true);
          }}
        >
          <RightOutlined />
        </div>
      )}
      <div
        className="overlay__closeButton"
        id="closeButton"
        onClick={() => {
          props.setShowOverlay(false);
        }}
      >
        <CloseOutlined />
      </div>
      <div className="overlay__pictureContainer">
        {isPictureLoading || imageLoaded === null ? (
          <div className="overlay__pictureLoading">
            <LoadingOutlined className="overlay__spinner" />
          </div>
        ) : (
          <img
            className="overlay__picture"
            src={imageLoaded}
            key={`img__${indexImageSelected}`}
          />
        )}
      </div>
    </div>
  );
});
