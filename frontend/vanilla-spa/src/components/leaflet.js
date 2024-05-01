import 'leaflet/dist/leaflet.css';
import '../style.css';

import L from 'leaflet';

L.Icon.Default.imagePath = '/leaflet/images/';


class LeafletMap extends HTMLElement {
  constructor() {
      super();
      let center = JSON.parse(this.getAttribute("center"));
      
      this.innerHTML = /*html*/`
          <h3>Leaflet</h3>
          <div id="leaflet-map"></div>
      `;

      const htmlContainer = document.getElementById('leaflet-map');

      const map = L.map(htmlContainer, {
        center: L.latLng(center[1], center[0]),
        zoom: 15,
      });
      
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 0,
        maxZoom: 18,
      }).addTo(map);
      L.control.scale().addTo(map);
      
      L.marker(center.reverse()).addTo(map).on('click', function(_e) {
        window.open('/docs', '_self');
      });
  }
}

customElements.define("leaflet-map", LeafletMap);

