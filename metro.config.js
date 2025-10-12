const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// This is a workaround for the ENOSPC error on Termux
config.resolver.blockList = [
  /.*\/react-native\/ReactAndroid\/src\/main\/res\/.*/,
  /.*\/@firebase\/.*/,
  /.*\/react-native\/ReactCommon\/react\/renderer\/components\/scrollview\/platform\/android\/react\/renderer\/components\/.*/,
  /.*\/node_modules\/expo\/node_modules\/@expo\/cli\/build\/src\/start\/server\/metro\/debugging\/.*/,
];

module.exports = config;