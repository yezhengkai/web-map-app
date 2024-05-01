import { fetchData } from '/src/modules/data.js';
import { MapCreator } from '/src/modules/maps.js';
import { filterMarkersList, populateMarkersListFromGeoJSON } from "/src/modules/markers.js";
import '/src/style.css';

// Define variables
const markersUrl = '/markers.geojson';

// Fetch json
const data = await fetchData(markersUrl, { method: "GET" });  // With await, data is an object. Without await, data is a Promise

// Map
let htmlContainer = 'map';
let classType = 'maptalks';
let centerLng = 139.76712479635535;
let centerLat = 35.68123617258725;
let initOptions = {centerLng: centerLng, centerLat: centerLat, zoom: 15};
const mapCreator = new MapCreator(htmlContainer);
const myMap = mapCreator.create(classType);

myMap.init(initOptions);
myMap.addMarkersFromJSON(data);

// DOM
populateMarkersListFromGeoJSON(data);

// Events
document.getElementById('markers-list').addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    const markerId = e.target.dataset.markerId;
    myMap.moveToMarker(data, markerId);
  }
});

document.getElementById('search-input').addEventListener('input', function () {
  const searchValue = this.value.toLowerCase();
  filterMarkersList(searchValue);
});

