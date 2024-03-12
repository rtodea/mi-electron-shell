# Electron Shell for URLs

## Goal

Create a simple Electron shell that can be used to open URLs.

## Steps

:warning: **To create Windows build you need to be on Windows**

### Install Node/NPM

First, you need to have Node.js and NPM installed. You can download it from [here](https://nodejs.org/).

### Install Electron Dependencies

```bash
npm ci
```

### Create `config.json` with the correct URL

```json
{
    "url": "https://www.google.com"
}
```

### Create Distributable Package

```bash
npm run package
```

The package will be created in the `out` folder:
Example:
```
.
└── e-app-win32-x64
    ├── chrome_100_percent.pak
    ├── chrome_200_percent.pak
    ├── d3dcompiler_47.dll
    ├── e-app.exe
    ├── ffmpeg.dll
    ├── icudtl.dat
    ├── libEGL.dll
    ├── libGLESv2.dll
    ├── LICENSE
    ├── LICENSES.chromium.html
    ├── locales
    │   ├── af.pak
    │   ...
    │   └── zh-TW.pak
    ├── resources
    │   └── app.asar
    ├── resources.pak
    ├── snapshot_blob.bin
    ├── Squirrel.exe
    ├── v8_context_snapshot.bin
    ├── version
    ├── vk_swiftshader.dll
    ├── vk_swiftshader_icd.json
    └── vulkan-1.dll
```

The executable is `e-app.exe`.

## Re-using the same build for different URLs (Experimental)

```bash
cp config.json.template config.json
npm run make
```

```bash
MI_TARGET_URL="https://www.google.com"
TEMPLATE_BUILD="out/e-app-win32-x64"
FINAL_BUILD="out/e-app-win32-x64-final"
cp -r $TEMPLATE_BUILD $FINAL_BUILD
cd $FINAL_BUILD/locale
npx asar app.asar app-asar
cp app.asar app.asar.bkp
sed -i "s|<MI_TARGET_URL>|$MI_TARGET_URL|g" app-asar/config.js
npx asar pack app-asar app.asar
```