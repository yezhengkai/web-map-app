import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Use cesium
const cesiumSource = "node_modules/cesium/Build/Cesium";
// Use @cesium/engine
// const cesiumEngine = "node_modules/@cesium/engine";
// const cesiumWidgets = "node_modules/@cesium/widgets";

// This is the base url for static files that CesiumJS needs to load.
// Set to an empty string to place the files at the site's root path
const cesiumBaseUrl = "cesiumStatic";


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // Define relative base path in cesium for loading assets
    // https://vitejs.dev/config/shared-options.html#define
    CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory.
    // If you need to add your own static files to your project, use the `public` directory
    // and other options listed here: https://vitejs.dev/guide/assets.html#the-public-directory
    viteStaticCopy({
      targets: [
        // Use cesium
        { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
    //     // FIXME: Use @cesium/engine
    //     // { src: `${cesiumEngine}/Build/Workers`, dest: cesiumBaseUrl },
    //     // { src: `${cesiumEngine}/Build/ThirdParty`, dest: cesiumBaseUrl },
    //     // { src: `${cesiumEngine}/Source/Assets`, dest: cesiumBaseUrl },
    //     // { src: `${cesiumWidgets}/Source/Images`, dest: cesiumBaseUrl },
      ],
    }),
  ],
  base: './',
  server:{
    watch:{
      usePolling: true
    }
  },
  build: {
    target: 'esnext',  // Top-level await: https://github.com/vitejs/vite/issues/6985
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //     real_estate: resolve(__dirname, 'real-estate-docs/index.html'),
    //   },
    // },
 }
})