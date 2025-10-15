const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// This blockList is a targeted approach to prevent the ENOSPC error
// by ignoring files and directories that are not needed for bundling.
config.resolver.blockList = [
  // Ignore Git directories
  /\.git\//,
  // Ignore test files and directories
  /.*\/__tests__\//,
  /.*\/__mocks__\//,
  /.*\.test\.js/,
  // Ignore documentation files
  /.*\/docs\//,
  /.*\.md$/,
  // Ignore build artifacts and caches
  /.*\/android\/build\//,
  /.*\/ios\/build\//,
  /\.idea\//,
  /\.vscode\//,
  // Add more file types and directories to ignore
  /.*\.podspec$/,
  /.*\.flow$/,
  /.*\.DS_Store$/,
];

module.exports = config;
