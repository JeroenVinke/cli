'use strict';
const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  let configureJasmine = require('./jasmine');
  configureJasmine(project);

  let transpilerId = project.model.transpiler.id;
  let testContentRoot = `test/webpack/${transpilerId}`;

  project.addToContent(
    project.tests.add(
      ProjectItem.resource('jest-pretest.js', `${testContentRoot}/jest-pretest.js`)
    )
  ).addToDevDependencies(
    'jest',
    'jest-cli',
    'aurelia-loader-nodejs',
    'aurelia-pal-nodejs'
  );

  if (project.model.transpiler.id === 'babel') {
    project.addToDevDependencies(
      'babel-jest'
    );
  }

  project.package.jest = {
    modulePaths: [
      '<rootDir>/src',
      '<rootDir>/node_modules'
    ],
    moduleFileExtensions: [
      'js',
      'json'
    ],
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testRegex: '\\.spec\\.(ts|js)x?$',
    setupFiles: [
      '<rootDir>/test/jest-pretest.js'
    ],
    testEnvironment: 'node',
    moduleNameMapper: {
      'aurelia-(.*)': '<rootDir>/node_modules/$1'
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,ts}',
      '!**/*.spec.{js,ts}',
      '!**/node_modules/**',
      '!**/test/**'
    ],
    coverageDirectory: '<rootDir>/test/coverage-jest',
    coverageReporters: [
      'json',
      'lcov',
      'text',
      'html'
    ]
  };
};
