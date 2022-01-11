import {resolve} from 'path';
import {defineConfig} from 'vite';
import {alwaysReloadPlugin} from './always-reload-plugin';

// See guide on how to configure Vite at: https://vitejs.dev/config/
const viteConfig = defineConfig({
    plugins: [alwaysReloadPlugin()],
    build: {
        rollupOptions: {
            input: {
                main: resolve('index.html'),
            },
        },
    },
    clearScreen: false,
});

export default viteConfig;
