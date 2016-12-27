/* jshint browser:true */
/* global google */

'use strict';

let markers = require('./tx-gMarkers');

module.exports = (mapID, centerCoords, markersCoords, markerImage) => {

  let center = new google.maps.LatLng(centerCoords.lat, centerCoords.lon);
  let options = {
    center: center,
    zoom: 16
  };

  let dom = document.getElementById(mapID);
  let map = new google.maps.Map(dom, options);

  return {
    map: map,
    markers: markers(map, markersCoords, markerImage)
  };

};
