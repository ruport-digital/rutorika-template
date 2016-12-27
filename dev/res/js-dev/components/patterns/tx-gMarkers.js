/* jshint browser:true */
/* global google */

module.exports = (map, markers, icon) => {
  return markers.map(marker => new google.maps.Marker({
    position: new google.maps.LatLng(marker.lat, marker.lon),
    map: map,
    icon: icon
  }));
};
