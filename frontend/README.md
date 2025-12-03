# macOS Dock-Style Image Viewer (Ocean Professional)

A lightweight React app that emulates the macOS dock with hover magnification and an image preview area, styled using the Ocean Professional theme.

## Features
- Bottom-fixed dock bar with magnification on hover and subtle shadows/rounded corners
- Image preview pane above the dock with smooth transitions
- Simple browser controls (Previous/Next and click-to-select)
- Responsive on small screens
- Self-contained; uses local sample images in `public/assets`

## Getting Started

From this folder:

```bash
npm install
npm start
```

- App URL: http://localhost:3000

## Assets
Sample images are referenced from `public/assets/sample1.jpg` through `sample7.jpg`. Replace these with your own images by keeping the same filenames or updating the paths in `src/App.js` (DEFAULT_IMAGES).

Note: In this template, placeholder files are used as stand-ins to ensure paths resolve. For production use, replace placeholder assets with real images.

## Environment Variables
The app is future-proofed to use the following variables if needed:
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

Basic functionality does not depend on these vars.

## Testing
```bash
npm test
```

## Build
```bash
npm run build
```

## Customize
- Update colors and style in `src/App.css`.
- Replace images in `public/assets` with your own content and update `DEFAULT_IMAGES` in `src/App.js` accordingly.
