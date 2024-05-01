import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';

import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import maplibregl from 'maplibre-gl';
import OpacityControl from 'maplibre-gl-opacity';
import { GeocodingServices } from './modules/utils';

// https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
import mplStyle from './assets/mpl-style.json' assert { type: 'json' };

const { BASE_URL } = import.meta.env;
// const geocodingProvider = 'japan-gsi';
const geocodingProvider = 'nominatim';
const markerLngLat = [139.76712479635535, 35.68123617258725];
const center = [139.76712479635535, 35.68123617258725];

const map = new maplibregl.Map({
  container: 'map',
  style: mplStyle,
  center: center,
  zoom: 15,
  antialias: true
});


const marker = new maplibregl.Marker().setLngLat(markerLngLat).addTo(map)

marker.getElement().addEventListener('click', () => {
  window.open(`${BASE_URL}test1.txt`)
});


const geocoderApi = GeocodingServices.makeMaplibreGeocoderApi(geocodingProvider);

map.on('load', function () {
  // MIERUNE Color
  map.addSource('m_color', {
    type: 'raster',
    tiles: ['https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png'],
    tileSize: 256,
  });
  map.addLayer({
    id: 'm_color',
    type: 'raster',
    source: 'm_color',
    minzoom: 0,
    maxzoom: 18,
  });

  // GSI Pale
  map.addSource('t_pale', {
    type: 'raster',
    tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
    tileSize: 256,
  });
  map.addLayer({
    id: 't_pale',
    type: 'raster',
    source: 't_pale',
    minzoom: 0,
    maxzoom: 18,
  });

  // GSI Ort
  map.addSource('t_ort', {
    type: 'raster',
    tiles: ['https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'],
    tileSize: 256,
  });
  map.addLayer({
    id: 't_ort',
    type: 'raster',
    source: 't_ort',
    minzoom: 0,
    maxzoom: 18,
  });

  // BaseLayer
  const mapBaseLayer = {
    osm: 'OpenStreetMap',
    m_mono: 'MIERUNE Mono',
    m_color: 'MIERUNE Color',
  };

  // OverLayer
  const mapOverLayer = {
    t_pale: 'GSI Pale',
    t_ort: 'GSI Ort',
  };

  // OpacityControl
  let Opacity = new OpacityControl({
    baseLayers: mapBaseLayer,
    overLayers: mapOverLayer,
    opacityControl: true,
  });
  map.addControl(Opacity, 'bottom-right');

  // NavigationControl
  let nc = new maplibregl.NavigationControl();
  map.addControl(nc, 'top-left');

  // ScaleControl
  map.addControl(new maplibregl.ScaleControl());

  // MaplibreGeocoder
  map.addControl(new MaplibreGeocoder(geocoderApi, { maplibregl, collapsed: true, limit: 100, placeholder: 'search', flyTo: { maxZoom: 16, minZoom: 10 } }));
});
