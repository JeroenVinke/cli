'use strict';
const InstallNodeModules = require('./install-node-modules');
const ChangeDirectory = require('./change-dir');
const ExecuteCommand = require('./execute-command');
const TakeScreenShotOfPage = require('./take-screenshot-of-page');
const InstallLatestAureliaCLI = require('./install-latest-aurelia-cli');

module.exports = {
  InstallNodeModules,
  ChangeDirectory,
  ExecuteCommand,
  TakeScreenShotOfPage,
  InstallLatestAureliaCLI
};
