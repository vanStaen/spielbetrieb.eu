/* https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452
&location_type=ROOFTOP&result_type=street_address&key=YOUR_API_KEY */

export async function getAddressFromCoordinates(coordinates) {
  const endpoint =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";

  const options = {
    method: "GET",
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  console.log(response);
  console.log(data);

  if (data.errors) {
    return data.errors[0];
  }
  return data.data;
}
