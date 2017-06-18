'use strict';
const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  let configureJasmine = require('./jasmine');
  configureJasmine(project);

  let transpilerId = project.model.transpiler.id;
  let testContentRoot = `test/webpack/${transpilerId}`;

  project.addToContent(
    project.tests.add(
      ProjectItem.resource('karma.conf.js', `${testContentRoot}/karma.conf.js`),
      ProjectItem.resource('karma-bundle.js', `${testContentRoot}/karma-bundle.js`)
    )
  ).addToDevDependencies(
    'jasmine-core',
    'karma',
    'karma-chrome-launcher',
    'karma-coverage',
    'karma-jasmine',
    'karma-mocha-reporter',
    'karma-webpack',
    'jest-jasmine2'
  );

  if (project.model.transpiler.id === 'babel') {
    project.addToDevDependencies('karma-babel-preprocessor');
  } else {
    project.addToDevDependencies('karma-typescript-preprocessor', '@types/jasmine');
  }
};
