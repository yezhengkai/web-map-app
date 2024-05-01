import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  const sharedOptions = {
    base: './',
  };

  if (command === 'serve') {
    return {
      ...sharedOptions,
      // dev specific config
      server: {
        // add `usePolling: true` if you're using windows and hot reload doesn't work. ref: https://dev.to/ysmnikhil/how-to-build-with-react-or-vue-with-vite-and-docker-1a3l
        watch: {
          // env.VITE_USE_POLLING from .env.development.local.
          // https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
          // 'true' === 'true' => true
          // 'false' === 'true' => false
          // undefined === 'true' => false
          usePolling: env.VITE_USE_POLLING === 'true'
        }
      },
    }
  } else {
    // command === 'build'
    return {
      ...sharedOptions,
      // build specific config
      appType: 'mpa',
      build: {
        target: 'esnext',  // Top-level await: https://github.com/vitejs/vite/issues/6985
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            page_leaflet: resolve(__dirname, 'page-leaflet/index.html'),
            page_maplibre: resolve(__dirname, 'page-maplibre/index.html'),
            page_maptalks: resolve(__dirname, 'page-maptalks/index.html'),
          },
        },
     }
    }
  }



})
