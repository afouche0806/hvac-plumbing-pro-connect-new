const { getDefaultConfig } = require('expo/metro-config');
const path = require('path'); // Import path module

const config = getDefaultConfig(__dirname);

// This is a workaround for the ENOSPC error on Termux
config.resolver.blockList = [
  /.*\/react-native\/ReactAndroid\/src\/main\/res\/systeminfo\/.*/,
  /.*\/@firebase\/auth-compat\/node_modules\/@firebase\/auth\/dist\/cordova\/.*/,
  /.*\/react-native\/ReactCommon\/react\/renderer\/components\/scrollview\/platform\/android\/react\/renderer\/components\/.*/,
  /.*\/node_modules\/expo\/node_modules\/@expo\/cli\/build\/src\/start\/doctor\/apple\/.*/,
  /.*\/node_modules\/firebase\/.*/,
];

config.resolver.extraNodeModules = {
  'three/examples/js/loaders/STLLoader': path.resolve(__dirname, 'node_modules/three/examples/jsm/loaders/STLLoader.js'),
};

module.exports = config;