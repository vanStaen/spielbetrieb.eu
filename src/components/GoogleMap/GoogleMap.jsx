import React from "react";

export const GoogleMap = (props) => {
  const { locationName, locationAddress, coordinates } = props;

  const qParameters = [];
  if (locationName) {
    qParameters.push(locationName.replaceAll(" *", ",+"));
  }
  if (locationAddress) {
    qParameters.push(locationAddress.replaceAll(" *", ",+"));
  }
  if (!locationName && !locationAddress && coordinates) {
    qParameters.push(coordinates);
  }
  if (qParameters.length === 0) {
    return;
  }

  // TODO Get own GoogleAPi Key
  return (
    <iframe
      style={{ height: "100%", width: "100%" }}
      frameBorder="0"
      src={`https://www.google.com/maps/embed/v1/place?q=${qParameters.join("+")}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
    ></iframe>
  );
};
