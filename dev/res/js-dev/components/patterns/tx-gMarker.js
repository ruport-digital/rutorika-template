/* global google */

function newMarker(marker, map, icon) {
  return new google.maps.Marker({
    position: new google.maps.LatLng(marker.lat, marker.lon),
    map,
    icon,
  });
}

export default function gMarker(map, markers, icon) {
  return markers.map(marker => newMarker(marker, map, icon));
}
