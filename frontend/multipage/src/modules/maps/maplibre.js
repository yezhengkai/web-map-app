import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '/src/modules/maps/maplibre.css';

export class MapLibreMap {
  constructor(htmlContainer) {
    this.htmlContainer = htmlContainer;
  }

  init(options) {
    var options = {
      container: this.htmlContainer,
      center: [options.centerLng, options.centerLat],
      style: {
        'version': 8,
        'sources': {
          "osm": {
            "type": 'raster',
            "tiles": [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            "tileSize": 256,
            "attribution": '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            "maxzoom": 19
          }
        },
        "layers": [
          {
            "id": "osm",
            "type": "raster",
            "source": "osm" // This must match the source key above
          }
        ]
      },
      ...options,
    };
    this.map = new maplibregl.Map(options);
    this.map.addControl(new maplibregl.NavigationControl());
  }

  setView(centerLng, centerLat, zoom, options) {
    this.map.setView([centerLat, centerLng], zoom, options);
  }

  addMarkersFromJSON(data) {
    // Ref:
    // https://apidocs.geoapify.com/samples/geojson/geojson-points-layer-mapbox/
    // https://docs.maptiler.com/sdk-js/examples/geojson-point/
    // https://docs.mapbox.com/help/troubleshooting/markers-vs-layers/
    let imageId = 'marker-icon';
    let sourceId = 'markers-source';
    let layerId = 'markers-layer';
    this.map.on('load', () => {
      // FIXME: WARNING: Image "marker-icon" could not be loaded. Please make sure you have added the image with map.addImage() or a "sprite" property in your style. You can provide missing images by listening for the "styleimagemissing" map event.
      // Image copied from https://github.com/maptalks/examples/blob/master/src/style/image-marker/1.png
      this.map.loadImage('/maplibre/images/location-dot.png', (error, image) => {
        if (error) throw error;
        this.map.addImage(imageId, image, {pixelRatio: 1});
      });

      this.map.addSource(
        sourceId,
        { 'type': 'geojson', 'data': data }
      );

      this.map.addLayer({
        'id': layerId,
        'type': 'symbol',
        'source': sourceId,
        'layout': {
          'icon-image': imageId,
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
        },
      });
    });

    this.map.on('click', layerId, function(e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var name = e.features[0].properties.name;
  
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new maplibregl.Popup({
          anchor: 'bottom',
          offset: [0, -40],
        })
        .setLngLat(coordinates)
        .setText(name)
        .addTo(this);  // this === MapLibreMap.map
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on('mouseenter', layerId, function() {
      this.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', layerId, () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  moveToMarker(data, markerId) {
    data.features.forEach(marker => {
      if (markerId == marker.properties.id) {
        this.map.flyTo({
          center: [marker.geometry.coordinates[0], marker.geometry.coordinates[1]],
          zoom: 15
        });
      }
    });
  }
}