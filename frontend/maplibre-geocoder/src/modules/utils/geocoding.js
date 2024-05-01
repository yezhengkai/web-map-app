import { fetchData } from './data.js';

export { GeocodingServices, getLngLat };

// Ref: https://elsammit-beginnerblg.hatenablog.com/entry/2021/07/11/122916
async function getLngLat(address, options) {
  let json = await fetchData(`https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURI(address)}`, { method: 'GET' });
  if (options.callback) {
    return options.callback(json)
  } else {
    return json[0]['geometry']['coordinates'];
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://pjchender.dev/webapis/guide-webapis-url-parameters/
class GeocodingServices {

  static apiURLs = {
    "japan-gsi": new URL('https://msearch.gsi.go.jp/address-search/AddressSearch'),
    nominatim: new URL('https://nominatim.openstreetmap.org/search')
  };

  get apiURLs() {
    console.log(GeocodingServices.apiURLs)
    return GeocodingServices.apiURLs
  }

  static getURL(provider) {
    return GeocodingServices.apiURLs[provider]
  }

  static async query(provider, queryParams, options) {
    if (provider == 'japan-gsi') {
      var url = GeocodingServices.getURL('japan-gsi');
    } else if (provider == 'nominatim') {
      var url = GeocodingServices.getURL('nominatim');
    } else {
      console.warn('Use nominatim geocoding')
      var url = GeocodingServices.getURL('nominatim');
    }
    let searchParams = new URLSearchParams({
      ...queryParams
    });
    url.search = searchParams
    const response = await fetch(url.href);
    const json = await response.json();
    if (options.callback) {
      return options.callback(json)
    } else {
      return json;
    }
  }

  static makeMaplibreGeocoderApi(provider) {
    if (provider == 'japan-gsi') {
      return GeocodingServices.#gsiMaplibreGeocoderApi()
    } else if (provider == 'nominatim') {
      return GeocodingServices.#nominatimMaplibreGeocoderApi()
    } else {
      console.warn('Use nominatim geocoding')
      return GeocodingServices.#nominatimMaplibreGeocoderApi()
    }
  }

  static #gsiMaplibreGeocoderApi() {
    return {
      forwardGeocode: async (config) => {
        const features = [];
        try {
          let url = GeocodingServices.getURL('japan-gsi');
          let searchParams = new URLSearchParams({
            q: config.query,
          });
          url.search = searchParams
          const response = await fetch(url.href);
          const geojson = await response.json();
          for (const feature of geojson) {
            const point = {
              ...feature,
              place_name: feature.properties.title,
              text: feature.properties.title,
              place_type: ['place'],
            };
            features.push(point);
          }
        } catch (e) {
          console.error(`Failed to forwardGeocode with error: ${e}`);
        }
        return {
          features
        };
      }
    }
  }

  static #nominatimMaplibreGeocoderApi() {
    return {
      forwardGeocode: async (config) => {
        const features = [];
        try {
          let url = GeocodingServices.getURL('nominatim');
          let searchParams = new URLSearchParams({
            q: config.query,
            format: 'geojson',
            polygon_geojson: '1',
            addressdetails: '1',
          });
          url.search = searchParams
          const response = await fetch(url.href);
          const geojson = await response.json();
          console.log(geojson);
          for (const feature of geojson.features) {
            const center = [
              // Math.max
              feature.bbox[0] +
              (feature.bbox[2] - feature.bbox[0]) / 2,
              feature.bbox[1] +
              (feature.bbox[3] - feature.bbox[1]) / 2
            ];
            console.log(center);
            const point = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: center
              },
              place_name: feature.properties.display_name,
              properties: feature.properties,
              text: feature.properties.display_name,
              place_type: ['place'],
              center
            };
            features.push(point);
          }
          console.log(features);
        } catch (e) {
          console.error(`Failed to forwardGeocode with error: ${e}`);
        }
        return {
          features
        };
      },
      // optional
      // reverseGeocode: async (config) => { /* definition here */ }, // reverse geocoding API
      // getSuggestions: async (config) => { /* definition here */ }, // suggestion API
      // searchByPlaceId: async (config) => { /* definition here */ } // search by Place ID API
    }
  }
}
