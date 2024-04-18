import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";

import { eventFormStore } from "../eventFormStore";
import { publishEvent } from "../EventFormSteps/PublishForm/publishEvent";

import "./EventFormNavigation.less";

export const EventFormNavigation = observer((props) => {
  const keydownEventHandler = (event) => {
    if (eventFormStore.deactivateNav) {
      return;
    }
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "arrowleft") {
      event.preventDefault();
      naviguateHandler(false);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      naviguateHandler(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownEventHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  const naviguateHandler = (next) => {
    if (next && eventFormStore.formStep === 3) {
      // console.error("there is only 4 steps");
      return;
    } else if (!next && eventFormStore.formStep === 0) {
      // console.error("it was already the first step");
      return;
    }
    const newStep = next
      ? eventFormStore.formStep + 1
      : eventFormStore.formStep - 1;
    props.onStepsChange(newStep);
  };

  const publishHandler = () => {
    if (!eventFormStore.errors) {
      publishEvent();
    }
  };

  return (
    <div className="eventform__navigation">
      <Button
        className="eventform__navButtons"
        onClick={() => {
          naviguateHandler(false);
        }}
        disabled={eventFormStore.formStep === 0}
      >
        Previous
      </Button>
      {eventFormStore.formStep === 3 ? (
        <Button
          className="eventform__publishButton"
          onClick={publishHandler}
          disabled={eventFormStore.errors}
        >
          Publish
        </Button>
      ) : (
        <Button
          className="eventform__navButtons"
          onClick={() => {
            naviguateHandler(true);
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
});
