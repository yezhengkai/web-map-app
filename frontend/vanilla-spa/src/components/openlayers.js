import 'ol-ext/dist/ol-ext.css';
import 'ol/ol.css';
import '../style.css'
import '../style_openlayers.css';

import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { ScaleLine } from 'ol/control';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source.js';
import XYZ from 'ol/source/XYZ';
import { Icon, Style } from 'ol/style.js';

// New component
class OpenLayersMap extends HTMLElement {
  constructor() {
    super();
    let center = JSON.parse(this.getAttribute("center"));

    this.innerHTML = /*html*/`
          <h3>Openlayers</h3>
          <div id=openlayers-map></div>
      `;

    const htmlContainer = document.getElementById('openlayers-map');

    const style = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: '/leaflet/images/marker-icon.png',
      }),
    })
    const marker = new Feature({
      geometry: new Point(fromLonLat(center)),
    })
    marker.setStyle(style);

    const vectorSource = new VectorSource({
      features: [marker],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    const rasterLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        attributionsCollapsible: true,

      })
    });

    const map = new Map({
      target: htmlContainer,
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: fromLonLat(center),
        zoom: 15,
        maxZoom: 18,
        constrainOnlyCenter: true,
      }),
    });

    map.addControl(new ScaleLine({
      units: 'metric'
    }));


    // open new window on click
    map.on('click', function (_evt) {
      window.open('/docs', '_self');
    });

    // change mouse cursor when over marker
    map.on('pointermove', function (e) {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTarget().style.cursor = hit ? 'pointer' : '';
    });
  }
}

customElements.define("openlayers-map", OpenLayersMap);

