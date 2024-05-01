import * as maptalks from 'maptalks';
import 'maptalks/dist/maptalks.css';
export class MapTalksMap {
  constructor(htmlContainer) {
    this.htmlContainer = htmlContainer;
  }
  
  init(options) {
    var options  = {
      center: [options.centerLng, options.centerLat],
      ...options,
    };
    this.map = new maptalks.Map(this.htmlContainer, options);
    let layer = new maptalks.TileLayer('base', {
      urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a','b','c'],
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    layer.addTo(this.map);
  }

  setView(centerLng, centerLat, zoom, options) {
    this.map.setView(
      {
        center: [centerLng, centerLat],
        zoom: zoom,
        ...options,
      }
    );
  }

  addMarkersFromJSON(data) {
    var markers = maptalks.GeoJSON.toGeometry(
      data,
      feature => {
        let coordinates = feature.getCoordinates();
        feature.setInfoWindow({
          title: `${feature.properties.name}`,
          content: `Lng:${coordinates['x']}<br>Lat:${coordinates['y']}`
        });
      }
    );
    new maptalks.VectorLayer('markers', markers).addTo(this.map);
  }

  moveToMarker(data, markerId) {
    data.features.forEach(marker => {
      if (markerId == marker.properties.id) {
        this.map.animateTo({
          center: [marker.geometry.coordinates[0], marker.geometry.coordinates[1]],
          zoom:16  // the zoom level is different from leaflet and maptalks
        });
      }
    });
  }
}
