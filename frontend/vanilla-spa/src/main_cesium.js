// TODO
import "@cesium/engine/Source/Widget/CesiumWidget.css";
import "@cesium/widgets/Source/widgets.css";
import './style.css';

import { CesiumWidget, ImageryLayer, OpenStreetMapImageryProvider } from "@cesium/engine";
// import { createWorldImagery } from '@cesium/engine';
import { Viewer } from '@cesium/widgets';
import { Camera, Rectangle } from '@cesium/engine' 

const cesiumWidget = new CesiumWidget('map-b');
// const viewer = new Viewer('map-b');
var viewer = new Viewer('map-b', {
  // imageryProvider: createWorldImagery(),
  baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
    url: "https://tile.openstreetmap.org/"
  })),
});
