const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add AR asset extensions
config.resolver.assetExts.push('glb', 'gltf', 'obj', 'mtl', 'vrx', 'bin');
config.resolver.sourceExts.push('mjs');

// This is a workaround for the ENOSPC error on Termux
config.resolver.blockList = [
  /.*\/react-native\/ReactAndroid\/src\/main\/res\/systeminfo\/.*/,
  /.*\/@firebase\/auth-compat\/node_modules\/@firebase\/auth\/dist\/cordova\/.*/,
  /.*\/react-native\/ReactCommon\/react\/renderer\/components\/scrollview\/platform\/android\/react\/renderer\/components\/.*/,
  /.*\/node_modules\/expo\/node_modules\/@expo\/cli\/build\/src\/start\/doctor\/apple\/.*/,
  /.*\/node_modules\/firebase\/.*/,
  /.*\/node_modules\/.*/,
  /.*\/.gradle\/caches\/.*/,
];

module.exports = config;