// Ref: https://github.com/shoelace-style/shoelace/discussions/1240
import { defineConfig, loadEnv } from 'vite';


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const sharedOptions = {
    // base: './',
  };

  if (command === 'serve') {
    return {
      ...sharedOptions,
      base: './',
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
      base: '/web-map-app/',
      // build specific config
      build: {
        target: 'esnext',  // Top-level await: https://github.com/vitejs/vite/issues/6985
     }
    }
  }
})
