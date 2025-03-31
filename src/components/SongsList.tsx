[plugin:vite:import-analysis] Failed to resolve import "../Song/IshqMein.mp3" from "src/components/SongsList.tsx". Does the file exist?
C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/src/components/SongsList.tsx:5:21
12 |  import SpotifyPlayer from './SpotifyPlayer';
13 |  // Import audio files with correct names
14 |  import ishqMein from '../Song/IshqMein.mp3';
   |                        ^
15 |  import jaaneTu from '../Song/JaaneTu.mp3';
16 |  import shoppingList from '../Song/ShoppingList.mp3';
    at TransformPluginContext._formatError (file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:49255:41)
    at TransformPluginContext.error (file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:49250:16)
    at normalizeUrl (file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:64041:23)
    at async file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:64173:39
    at async Promise.all (index 4)
    at async TransformPluginContext.transform (file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:64100:7)
    at async PluginContainer.transform (file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:49096:18)
    at async loadAndTransform (file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:51929:27)
    at async viteTransformMiddleware (file:///C:/Users/yashc/Desktop/RetroWeb/retro-web-reboot/node_modules/vite/dist/node/chunks/dep-BWSbWtLw.js:61881:24
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.ts.