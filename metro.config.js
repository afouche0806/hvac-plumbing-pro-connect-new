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
  /.*\/.gradle\/caches\/.*/,
];

config.resolver.extraNodeModules = {
  'three/examples/js/loaders/STLLoader': path.resolve(__dirname, 'node_modules/three/examples/jsm/loaders/STLLoader.js'),
};

// Custom resolver to handle the STLLoader issue
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'three/examples/js/loaders/STLLoader') {
    return defaultResolveRequest(context, path.resolve(__dirname, 'node_modules/three/examples/jsm/loaders/STLLoader.js'), platform);
  }
  return defaultResolveRequest(context, moduleName, platform);
};

module.exports = config;