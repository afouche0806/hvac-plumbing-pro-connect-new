const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// This is a workaround for the ENOSPC error on Termux
config.resolver.blockList = [
  /.*\/react-native\/ReactAndroid\/.*/,
];

module.exports = config;