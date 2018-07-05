'use strict';
const tasks = require('./tasks/index');
const tests = require('./tests/index');

const defaultAureliaCLIBundlerTests = [
  new tasks.ChangeDirectory(),
  new tasks.InstallNodeModules(),
  new tasks.InstallLatestAureliaCLI(),
  new tests.requirejs.AuRunDoesNotThrowCommandLineErrors(),
  new tests.requirejs.AuRunLaunchesServer(),
  new tests.requirejs.AuRunWatchPicksUpFileChanges(),
  new tests.requirejs.AuRunAppLaunchesWithoutJavascriptErrors(),
  new tests.requirejs.AuRunRendersPage(),
  new tests.requirejs.AuTestRunsTests(),
  new tests.requirejs.AuProtractorRunsTests(),
  new tests.requirejs.AuLintFinishes()
];

module.exports = [
  {
    title: 'skeleton-requirejs-esnext',
    steps: defaultAureliaCLIBundlerTests
  },
  {
    title: 'skeleton-requirejs-typescript',
    steps: defaultAureliaCLIBundlerTests
  },
  {
    title: 'skeleton-systemjs-typescript',
    steps: defaultAureliaCLIBundlerTests
  },
  {
    title: 'skeleton-systemjs-esnext',
    steps: defaultAureliaCLIBundlerTests
  },
  {
    title: 'skeleton-webpack-esnext',
    steps: [
      new tasks.ChangeDirectory(),
      new tasks.InstallNodeModules(),
      new tasks.InstallLatestAureliaCLI(),
      new tests.webpack.AuRunDoesNotThrowCommandLineErrors()
    ]
  }
];
