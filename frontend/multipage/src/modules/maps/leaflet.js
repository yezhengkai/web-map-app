import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

L.Icon.Default.imagePath = '/leaflet/images/';

export class LeafletMap {
  constructor(htmlContainer) {
    this.htmlContainer = htmlContainer;
  }

  init(options) {
    var options = {
      center: [options.centerLat, options.centerLng],
      ...options,
    };
    this.map = L.map(this.htmlContainer, options);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    L.control.scale().addTo(this.map);
  }

  setView(centerLng, centerLat, zoom, options) {
    this.map.setView([centerLat, centerLng], zoom, options);
  }

  addMarkersFromJSON(data) {
    L.geoJSON(
      data,
      {
        onEachFeature: function onEachFeature(feature, layer) {
          // does this feature have a property named popupContent?
          if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
          }
        }
      }
    ).addTo(this.map);
  }

  moveToMarker(data, markerId) {
    data.features.forEach(marker => {
      if (markerId == marker.properties.id) {
        this.map.flyTo([marker.geometry.coordinates[1], marker.geometry.coordinates[0]], 16);
      }
    });
  }
}
