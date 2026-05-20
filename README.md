# AR Product Showcase

A complete no-backend AR product demo built with React, Vite, and Google `<model-viewer>`. Users can browse sample products, open an interactive 3D viewer, rotate and zoom products, and launch AR on supported mobile devices.

## Features

- React + Vite frontend only
- Google `@google/model-viewer` for 3D and AR
- Local product data in `src/data/products.js`
- Public asset paths for GLB/USDZ models and poster images
- Responsive product catalog with category filters and search
- Modal 3D viewer with a custom AR button
- Ready for Vercel deployment without backend configuration

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL printed by Vite.

## Build

```bash
npm run build
```

## Where To Place Models

This repository intentionally does not include binary 3D assets.

Place downloaded `.glb` files in:

```text
public/models
```

The sample product paths are:

```text
public/models/modern-chair.glb
public/models/table-lamp.glb
public/models/wireless-speaker.glb
public/models/running-shoe.glb
public/models/plant-pot.glb
public/models/museum-artifact.glb
```

For iOS Quick Look AR, optionally add matching `.usdz` files:

```text
public/models/modern-chair.usdz
public/models/table-lamp.usdz
public/models/wireless-speaker.usdz
public/models/running-shoe.usdz
public/models/plant-pot.usdz
public/models/museum-artifact.usdz
```

Do not import models from `src`. Vite serves everything in `public` from the site root, so `/models/modern-chair.glb` maps to `public/models/modern-chair.glb`.

## Poster Images

Place poster images in:

```text
public/posters
```

The sample poster paths are:

```text
public/posters/modern-chair.webp
public/posters/table-lamp.webp
public/posters/wireless-speaker.webp
public/posters/running-shoe.webp
public/posters/plant-pot.webp
public/posters/museum-artifact.webp
```

The UI includes a graceful fallback if a poster image is missing.

## Product Data

Edit `src/data/products.js` to add, remove, or change products. Each product includes:

- `id`
- `name`
- `category`
- `description`
- `modelPath`
- `iosModelPath`
- `posterPath`
- `license`
- `source`

## Deploy To Vercel

1. Push the repository to GitHub.
2. Import the GitHub repository in Vercel.
3. Vercel should auto-detect Vite.
4. Use the default build command: `npm run build`.
5. Use the default output directory: `dist`.
6. Deploy.

No backend, database, authentication, environment variables, or server-side API are required.

## AR Testing Notes

- AR requires a supported Android or iOS device.
- Test from an HTTPS URL. Vercel deployments provide HTTPS by default.
- Android AR commonly uses Scene Viewer or WebXR depending on browser/device support.
- iOS AR uses Quick Look and works best when a valid `.usdz` file is provided through `ios-src`.
- Desktop browsers will still show the interactive 3D preview with rotate and zoom controls.
- If a model path is missing, the viewer displays a helpful fallback message instead of breaking the app.

## License And Credits

The app source code can be used as a starter template. 3D model licenses vary by source, so only use models you have permission to use and document each model in `CREDITS.md`.
