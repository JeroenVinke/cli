'use strict';
const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  let configureJasmine = require('./jasmine');
  configureJasmine();

  let transpilerId = project.model.transpiler.id;
  let testContentRoot = `test/webpack/${transpilerId}`;

  project.addToContent(
    project.tests.add(
      ProjectItem.resource('jest-pretest.js', `${testContentRoot}/jest-pretest.js`)
    )
  ).addToDevDependency(
    'jest',
    'jest-cli'
  );

  if (project.model.transpiler.id === 'babel') {
    project.addToDevDependency(
      'babel-jest'
    );
  }

  project.package.jest = {
    'modulePaths': [
      '<rootDir>/src',
      '<rootDir>/node_modules'
    ],
    'moduleFileExtensions': [
      'js',
      'json'
    ],
    'transform': {
      '^.+\\.jsx?$': 'babel7-jest'
    },
    'testRegex': '\\.test\\.(ts|js)x?$',
    'setupFiles': [
      '<rootDir>/test/jest-pretest.js'
    ],
    'testEnvironment': 'node',
    'moduleNameMapper': {
      'aurelia-(.*)': '<rootDir>/node_modules/$1'
    }
  };
};
