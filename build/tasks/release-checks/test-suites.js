'use strict';
const tasks = require('./tasks/index');
const tests = require('./tests/index');

module.exports = [
  {
    title: 'skeleton-requirejs-esnext',
    steps: [
      new tasks.ChangeDirectory(),
      new tasks.InstallNodeModules(),
      new tasks.InstallLatestAureliaCLI(),
      new tests.requirejs.run.AuRunDoesNotThrowCommandLineErrors(),
      new tests.requirejs.run.AuRunLaunchesServer(),
      new tests.requirejs.run.AuRunWatchPicksUpFileChanges(),
      new tests.requirejs.run.AuRunAppLaunchesWithoutJavascriptErrors(),
      new tests.requirejs.run.AuRunRendersPage(),
      new tests.requirejs.test.AuTestRunsTests(),
      new tests.requirejs.lint.AuLintFinishes()
    ]
  },
  {
    title: 'skeleton-requirejs-typescript',
    steps: [
      new tasks.ChangeDirectory(),
      new tasks.InstallNodeModules(),
      new tasks.InstallLatestAureliaCLI(),
      new tests.requirejs.run.AuRunDoesNotThrowCommandLineErrors(),
      new tests.requirejs.run.AuRunLaunchesServer(),
      new tests.requirejs.run.AuRunWatchPicksUpFileChanges(),
      new tests.requirejs.run.AuRunAppLaunchesWithoutJavascriptErrors(),
      new tests.requirejs.run.AuRunRendersPage(),
      new tests.requirejs.test.AuTestRunsTests(),
      new tests.requirejs.lint.AuLintFinishes()
    ]
  }
];
