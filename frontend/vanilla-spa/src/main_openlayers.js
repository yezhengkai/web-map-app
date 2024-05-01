import 'ol-ext/dist/ol-ext.css';
import 'ol/ol.css';
import './style.css'
import './style_openlayers.css';

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

// import { getLonLat } from './modules/geocoding.js';

const htmlContainer = document.getElementById('map-a');
// const address = '東京都品川区上大崎３丁目８−３ 朝日サテライト目黒台　５０３号室';
// let lonLat = await getLonLat(address);
// console.log(coord);

// TODO
// const style = new Style({
//   image: new FontSymbol({
//       // glyph: 'fa-glass',
//       // text: '\uf111',  // fa-circle
//       font: 'FontAwesome',
//       form: 'marker',
//       radius: 20,
//       offsetY: -15,
//       fill: new Fill({
//           color: 'blue'
//       }),
//       stroke: new Stroke({
//           color: 'red',
//           width: 1
//       })
//   })
// });
const style = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: '/leaflet/images/marker-icon.png',
  }),
})
const marker = new Feature({
  geometry: new Point(fromLonLat([139.72008172173724, 35.63260736536777])),
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
    // tileSize: [256, 256],
    // minZoom: 0,
    // maxZoom: 18,
  })
});

const map = new Map({
  target: htmlContainer,
  layers: [rasterLayer, vectorLayer],
  view: new View({
    center: fromLonLat([139.72008172173724, 35.63260736536777]),
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
  window.open('../real-estate-docs/');
});

// TODO
// change mouse cursor when over marker
map.on('pointermove', function (e) {
  const pixel = map.getEventPixel(e.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  // console.log('1', pixel);
  // console.log(hit);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});