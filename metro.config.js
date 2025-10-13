const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add a blockList to prevent Metro from watching specific problematic directories
// within node_modules that cause ENOSPC errors due to excessive file watches.
config.resolver.blockList = [
  /node_modules\/.*build\/.transforms\//, // Ignore build/.transforms directories
];

module.exports = config;
