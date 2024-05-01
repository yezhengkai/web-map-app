import 'leaflet/dist/leaflet.css';
import './style.css';

import L from 'leaflet';

L.Icon.Default.imagePath = '/leaflet/images/';

const map = L.map('map-b', {
  center: L.latLng(35.63260736536777, 139.72008172173724),
  zoom: 15,
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  minZoom: 0,
  maxZoom: 18,
}).addTo(map);
L.control.scale().addTo(map);

L.marker([35.63260736536777, 139.72008172173724]).addTo(map).on('click', function(_e) {
  window.open('../real-estate-docs/');
});