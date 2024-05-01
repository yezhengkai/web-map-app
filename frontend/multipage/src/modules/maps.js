import { LeafletMap } from './maps/leaflet.js';
import { MapLibreMap } from './maps/maplibre.js';
import { MapTalksMap } from './maps/maptalks.js';
export class MapCreator {
  constructor(htmlContainer) {
    this.htmlContainer = htmlContainer;
  }

  create(classType) {
    const creatorMap = {
      leaflet: {
        Class: LeafletMap,
      },
      maptalks: {
        Class: MapTalksMap,
      },
      maplibre: {
        Class: MapLibreMap,
      },
    }

    let abstractMap

    if (creatorMap[classType]) {
      const { Class } = creatorMap[classType]
      abstractMap = new Class(this.htmlContainer);
      return abstractMap;
    } else {
      throw new Error(
        `Invalid class type "${classType}". Choose one of: "leaflet", "maptalks", "maplibre"`,
      );
    }
  }
}
