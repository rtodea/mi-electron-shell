const fs = require('fs');
const path = require('path');
const asar = require('asar');
const replace = require('replace');
const { execSync } = require('child_process');
const ncp = require('ncp').ncp;

// Define constants
const MI_TARGET_URL = process.env.MI_TARGET_URL || "https://www.google.com";
const TEMPLATE_BUILD = process.env.TEMPLATE_BUILD || "out/e-app-win32-x64";
const FINAL_BUILD = process.env.FINAL_BUILD || "out/e-app-win32-x64-final";

// Copy out/e-app-win32-x64 to out/e-app-win32-x64-final
ncp(TEMPLATE_BUILD, FINAL_BUILD, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // Change directory to out/e-app-win32-x64-final/locale
  process.chdir(path.join(FINAL_BUILD, 'locale'));

  // Extract app.asar
  asar.extract('app.asar', 'app-asar');

  // Backup app.asar
  fs.copyFileSync('app.asar', 'app.asar.bkp');

  // Replace <MI_TARGET_URL> with MI_TARGET_URL in config.js within app-asar
  replace({
    regex: "<MI_TARGET_URL>",
    replacement: MI_TARGET_URL,
    paths: ['app-asar/config.js'],
    recursive: false,
    silent: false
  });

  // Repack app.asar
  execSync('npx asar pack app-asar app.asar', { stdio: 'inherit', shell: true });
});