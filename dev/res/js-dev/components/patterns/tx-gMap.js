/* global google */

const markers = require('./tx-gMarkers');

module.exports = (mapID, centerCoords, markersCoords, markerImage) => {
  const center = new google.maps.LatLng(centerCoords.lat, centerCoords.lon);
  const options = {
    center,
    zoom: 16,
  };
  const dom = document.getElementById(mapID);
  const map = new google.maps.Map(dom, options);

  return {
    map,
    markers: markers(map, markersCoords, markerImage),
  };
};
