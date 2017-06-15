'use strict';

const ProjectItem = require('../../../../project-item').ProjectItem;

module.exports = function(project, options) {
  let model = project.model;

  project.configureDefaultStructure();
  project.configureDist(ProjectItem.directory('dist'));
  project.configureDefaultSetup();

  let configureTranspiler = require(`./transpilers/${model.transpiler.id}`);
  configureTranspiler(project, options);

  let configureUnitTestRunner = require(`./unit-test-runners/${model.unitTestRunner.id}`);
  configureUnitTestRunner(project, options);

  project.addToSource(
    ProjectItem.resource('main.ext', 'src/main-webpack.ext', model.transpiler)
  ).addToTasks(
    ProjectItem.resource('build.ext', 'tasks/build-webpack.ext', project.model.transpiler),
    ProjectItem.resource('build.json', 'tasks/build.json'),
    ProjectItem.resource('run.ext', 'tasks/run-webpack.ext', project.model.transpiler),
    ProjectItem.resource('run.json', 'tasks/run.json')
  ).addToContent(
    ProjectItem.resource('index.ejs', 'content/index-webpack.ejs'),
    ProjectItem.resource('package-scripts.js', 'content/package-scripts.js'),
    ProjectItem.resource('static/styles.css', 'content/styles-webpack.css'),
    ProjectItem.resource('static/favicon.ico', 'content/favicon.ico'),
    ProjectItem.resource('webpack.config.js', 'content/webpack.config.template.js')
      .asTemplate(model)
  ).addToDevDependencies(
    'html-webpack-plugin',
    'copy-webpack-plugin',
    'extract-text-webpack-plugin',
    'aurelia-webpack-plugin',
    'webpack',
    'webpack-dev-server',
    'expose-loader',
    'style-loader',
    'url-loader',
    'css-loader',
    'babel-plugin-istanbul'
  ).addToDependencies(
   'aurelia-polyfills'
  );

  project.package.engines = {
    'node': '>= 6.0.0'
  };

  project.package.scripts = {
    start: 'nps',
    test: 'nps test'
  };

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

  project.package.main = 'dist/app.bundle.js';
};
