import React from "react";

export const GoogleMap = (props) => {
  // TODO Get own GoogleAPi Key
  return (
    <iframe
      style={{ height: "100%", width: "100%" }}
      frameBorder="0"
      src={`https://www.google.com/maps/embed/v1/place?q=${props.locationName?.replaceAll(" *", ",+")}+${props.locationAddress?.replaceAll(" *", ",+")}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
    ></iframe>
  );
};
