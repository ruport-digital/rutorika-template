/* global google */

import gMarker from 'patterns/tx-gMarker';

export default function gMap(mapID, centerCoords, markersCoords, markerImage) {
  const center = new google.maps.LatLng(centerCoords.lat, centerCoords.lon);
  const options = {
    center,
    zoom: 16,
  };
  const dom = document.getElementById(mapID);
  const map = new google.maps.Map(dom, options);

  return {
    map,
    markers: gMarker(map, markersCoords, markerImage),
  };
}
