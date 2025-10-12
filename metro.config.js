const { getDefaultConfig } = require('expo/metro-config');
const path = require('path'); // Import path module

const config = getDefaultConfig(__dirname);

// This is a workaround for the ENOSPC error on Termux
config.resolver.blockList = []; // Clear blockList

// Explicitly define watchFolders to reduce the number of watched files
config.watchFolders = [
  __dirname,
  path.resolve(__dirname, 'node_modules'), // Watch node_modules
];

module.exports = config;
