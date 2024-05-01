import "../components/leaflet.js";
import "../components/openlayers.js";
import "../components/cesium.js";


export default () => `

<openlayers-map center="[139.76712479635535, 35.68123617258725]"></openlayers-map>
<leaflet-map center="[139.76712479635535, 35.68123617258725]"></leaflet-map>
<cesium-map center="[139.76712479635535, 35.68123617258725]"></cesium-map>
`;