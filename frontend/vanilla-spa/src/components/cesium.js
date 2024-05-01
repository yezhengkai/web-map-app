import { Cartesian3, ImageryLayer, OpenStreetMapImageryProvider, Viewer } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import '../style.css';


class CesiumMap extends HTMLElement {
  constructor() {
    super();
    let center = JSON.parse(this.getAttribute("center"));

    this.innerHTML = /*html*/`
          <h3>Cesium</h3>
          <div id="cesium-map"></div>
      `;
    const htmlContainer = document.getElementById('cesium-map');

    var viewer = new Viewer(
      htmlContainer,
      {
        baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
          url: "https://{s}.tile.openstreetmap.org/"
        })),
      }
    );

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(center[0], center[1], 1900.0)
    });
  }
}

customElements.define("cesium-map", CesiumMap);

