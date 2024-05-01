export { addMarkersFromJSON, filterMarkersList, moveToMarker, populateMarkersListFromGeoJSON, populateMarkersListFromJSON };

function addMarkersFromJSON(map, data) {
  data.markers.forEach(marker => {
    L.marker([marker.lat, marker.lng]).addTo(map)
  });
}

/**
 * Move the map to the selected marker
 */
function moveToMarker(map, data, markerId) {
  data.markers.forEach(marker => {
    if (markerId == marker.id) {
      console.log(`Move to marker with ID ${markerId}`)
      map.flyTo([marker.lat, marker.lng], 15)  // [lat, lng], targetZoom
    }
  });
}

function filterMarkersList(searchValue) {
  const markersList = document.getElementById('markers-list');
  const listItems = markersList.getElementsByTagName('li');

  Array.from(listItems).forEach(item => {
    const itemName = item.textContent.toLowerCase();
    if (itemName.includes(searchValue)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * Populate markers list dynamically from JSON
 * @param {object} data object from json
 */
function populateMarkersListFromJSON(data) {
  const markersList = document.getElementById('markers-list');
  markersList.innerHTML = ''; // Clear existing list

  data.markers.forEach(marker => {
    const listItem = document.createElement('li');
    listItem.textContent = marker.name;
    listItem.setAttribute('data-marker-id', marker.id);
    markersList.appendChild(listItem);
  });
}

function populateMarkersListFromGeoJSON(data) {
  const markersList = document.getElementById('markers-list');
  markersList.innerHTML = ''; // Clear existing list

  data.features.forEach(marker => {
    const listItem = document.createElement('li');
    listItem.textContent = marker.properties.name;
    listItem.setAttribute('data-marker-id', marker.properties.id);
    markersList.appendChild(listItem);
  });
}