/* jshint browser:true */
/* global google */

module.exports = (map, markers, icon) => {
  function newMarker(marker) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(marker.lat, marker.lon),
      map,
      icon,
    });
  }

  return markers.map(newMarker);
};
